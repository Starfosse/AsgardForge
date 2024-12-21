import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Connection } from 'mysql2/promise';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { User } from 'src/user/user.service';
import { AuthRepository } from './auth.repository';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    @Inject(DATABASE_CONNECTION)
    private connection: Connection,
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
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

      await this.authRepository.generateRefreshTokens(
        hashedRefreshToken,
        user.id,
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
      const userRefreshToken =
        await this.authRepository.findRefreshToken(userId);
      return await bcrypt.compare(token, userRefreshToken);
    } catch (error) {
      console.error('Error validating refresh token:', error);
      throw new Error('Failed to validate refresh token');
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

      const user = await this.userRepository.findById(payload.sub);
      return await this.generateTokens(user);
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        throw new Error('Invalid refresh token format');
      }
      if (error.name === 'TokenExpiredError') {
        throw new Error('Refresh token has expired');
      }
      throw new Error('Failed to refresh tokens');
    }
  }
}
