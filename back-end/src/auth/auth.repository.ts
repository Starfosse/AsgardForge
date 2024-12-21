import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
import { DATABASE_CONNECTION } from 'src/database/database.module';

@Injectable()
export class AuthRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private connection: Connection,
  ) {}
  async generateRefreshTokens(hashedRefreshToken, userId) {
    try {
      await this.connection.execute(
        'UPDATE users SET refresh_token = ?, updated_at = NOW() WHERE id = ?',
        [hashedRefreshToken, userId],
      );
    } catch (error) {
      console.error('Error generating refresh tokens:', error);
      throw new Error('Could not generate refresh tokens');
    }
  }
  async findRefreshToken(userId) {
    try {
      const [rows]: any = await this.connection.execute(
        'SELECT refresh_token FROM users WHERE id = ?',
        [userId],
      );
      if (!rows || !rows[0] || !rows[0].refresh_token) return false;
      return rows[0].refresh_token;
    } catch (error) {
      console.error('Error finding refresh token:', error);
      throw new Error('Could not find refresh token');
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
}
