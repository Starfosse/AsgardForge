import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { User, UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async generateToken(user: User) {
    const savedUser = await this.userService.findOrCreateUser(user);
    return {
      access_token: this.jwtService.sign({
        sub: user.id,
        google_id: user.google_id,
      }),
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        access_token: user.access_token,
      },
    };
  }
}
