import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Connection } from 'mysql2/promise';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { AuthRepository } from './auth.repository';
import { CustomerRepository } from 'src/customer/customer.repository';
import { Customer } from 'src/customer/customer.service';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    @Inject(DATABASE_CONNECTION)
    private connection: Connection,
    private authRepository: AuthRepository,
    private customerRepository: CustomerRepository,
  ) {}

  async generateTokens(customer: Customer) {
    try {
      const accessToken = jwt.sign(
        {
          sub: customer.id,
          email: customer.email,
        },
        this.configService.get('JWT_ACCESS_SECRET'),
        {
          expiresIn: '30m',
        },
      );

      const refreshToken = jwt.sign(
        {
          sub: customer.id,
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
        customer.id,
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

  async validateRefreshToken(
    token: string,
    customerId: number,
  ): Promise<boolean> {
    try {
      const customerRefreshToken =
        await this.authRepository.findRefreshToken(customerId);
      return await bcrypt.compare(token, customerRefreshToken);
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

      const customer = await this.customerRepository.findById(payload.sub);
      return await this.generateTokens(customer);
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
