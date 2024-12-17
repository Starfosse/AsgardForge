import {
  Controller,
  Get,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req) {
    if (!req.user) throw new UnauthorizedException('Authentication failed');
    const savedUser = await this.userService.findOrCreateUser(req.user);
    console.log('savedUser', savedUser);
    const user = {
      id: req.user.id,
      email: req.user.email,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      access_token: req.user.access_token,
    };
    const token = await this.authService.generateToken(req.user);
    return { token, user };
  }
}
