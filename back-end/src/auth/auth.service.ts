import { Inject, Injectable } from '@nestjs/common';
import { User, UserService } from 'src/user/user.service';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { Connection } from 'mysql2/promise';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    @Inject(DATABASE_CONNECTION)
    private connection: Connection,
  ) {}

  async generateTokens(user: User) {
    try {
      const accessToken = jwt.sign(
        {
          sub: user.id,
          email: user.email,
        },
        this.configService.get('JWT_ACCESS_SECRET'),
        {
          expiresIn: '15m',
        },
      );

      const refreshToken = jwt.sign(
        {
          sub: user.id,
          tokenType: 'refresh',
        },
        this.configService.get('JWT_REFRESH_SECRET'),
        {
          expiresIn: '7d',
        },
      );

      const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

      await this.connection.execute(
        'UPDATE users SET refresh_token = ?, updated_at = NOW() WHERE id = ?',
        [hashedRefreshToken, user.id],
      );

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error) {
      console.error('Error generating tokens:', error);
      throw new Error('Could not generate tokens');
    }
  }

  async validateRefreshToken(token: string, userId: number): Promise<boolean> {
    try {
      const [rows]: any = await this.connection.execute(
        'SELECT refresh_token FROM users WHERE id = ?',
        [userId],
      );

      if (!rows || !rows[0] || !rows[0].refresh_token) return false;

      return await bcrypt.compare(token, rows[0].refresh_token);
    } catch (error) {
      console.error('Error validating refresh token:', error);
      return false;
    }
  }

  async revokeRefreshToken(userId: number): Promise<void> {
    try {
      await this.connection.execute(
        'UPDATE users SET refresh_token = NULL, updated_at = NOW() WHERE id = ?',
        [userId],
      );
    } catch (error) {
      console.error('Error revoking refresh token:', error);
      throw new Error('Could not revoke refresh token');
    }
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload: any = jwt.verify(
        refreshToken,
        this.configService.get('JWT_REFRESH_SECRET'),
      );

      if (payload.tokenType !== 'refresh') {
        throw new Error('Invalid token type');
      }

      const isValid = await this.validateRefreshToken(
        refreshToken,
        payload.sub,
      );
      if (!isValid) {
        throw new Error('Invalid refresh token');
      }

      const [rows]: any = await this.connection.execute(
        'SELECT * FROM users WHERE id = ?',
        [payload.sub],
      );

      const user = rows[0];
      if (!user) {
        throw new Error('User not found');
      }

      return await this.generateTokens(user);
    } catch (error) {
      if (
        error.name === 'JsonWebTokenError' ||
        error.name === 'TokenExpiredError'
      ) {
        throw new Error('Invalid or expired refresh token');
      }
      throw error;
    }
  }
}
