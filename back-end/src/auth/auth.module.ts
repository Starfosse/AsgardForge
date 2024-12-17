import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key', // Remplacez par votre clé secrète
      signOptions: { expiresIn: '60s' }, // Options JWT
    }),
    ConfigModule.forRoot(),
    PassportModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService],
})
export class AuthModule {}
