import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User, UserService } from 'src/user/user.service';
import { Request, Response } from 'express';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { AuthRepository } from './auth.repository';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private authRepository: AuthRepository,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req, @Res() res: Response) {
    if (!req.user) throw new UnauthorizedException('Authentication failed');
    const savedUser = await this.userService.findOrCreateUser(req.user);
    const { access_token, refresh_token } =
      await this.authService.generateTokens(savedUser);
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/api/auth/refresh',
    });
    const frontendURL = 'http://localhost:5173';
    return res.redirect(`${frontendURL}/login/success?token=${access_token}`);
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res() res: Response, // Retirez { passthrough: true }
  ) {
    const refresh_token = req.cookies['refresh_token'];
    const tokens = await this.authService.refreshTokens(refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/api/auth/refresh',
    });

    return res.json({ access_token: tokens.access_token });
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(
    @CurrentUser() user: User,
    @Res() res: Response, // Retirez { passthrough: true }
  ) {
    await this.authRepository.revokeRefreshToken(user.id);

    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/api/auth/refresh',
    });

    return res.json({ message: 'Logged out successfully' });
  }
}
