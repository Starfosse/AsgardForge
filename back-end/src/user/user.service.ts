import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

export interface User {
  id: number;
  google_id: string;
  first_name: string;
  last_name: string;
  email: string;
  access_token?: string;
  created_at: Date;
}

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findOrCreateUser(userDetails: {
    google_id: string;
    first_name: string;
    last_name: string;
    email: string;
    access_token?: string;
  }) {
    let user = await this.userRepository.findByGoogleId(userDetails.google_id);

    if (!user) {
      user = await this.userRepository.create(userDetails);
    }

    return user;
  }
}
