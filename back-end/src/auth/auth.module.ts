import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    AuthService,
    AuthRepository,
    UserRepository,
    UserService,
  ],
})
export class AuthModule {}
