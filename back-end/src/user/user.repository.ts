import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { User } from './user.service';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly connection: Connection,
  ) {}

  async findByGoogleId(googleId: string): Promise<User | null> {
    const [rows]: any = await this.connection.query(
      'SELECT * FROM users WHERE google_id = ?',
      [googleId],
    );
    const user = rows[0];
    if (!user) return null;

    return {
      id: user.id,
      google_id: user.google_id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      access_token: user.access_token || '',
      created_at: new Date(user.created_at),
    };
  }

  async create(userData: Omit<User, 'id' | 'created_at'>): Promise<User> {
    const [result]: any = await this.connection.query(
      'INSERT INTO users (google_id, email, first_name, last_name, created_at) VALUES (?, ?, ?, ?, ?)',
      [
        userData.google_id,
        userData.email,
        userData.first_name,
        userData.last_name,
        new Date(),
      ],
    );

    const [rows]: any = await this.connection.query(
      'SELECT * FROM users WHERE id = ?',
      [result.insertId],
    );

    return {
      id: rows[0].id,
      google_id: rows[0].google_id,
      first_name: rows[0].first_name,
      last_name: rows[0].last_name,
      email: rows[0].email,
      access_token: rows[0].access_token || '',
      created_at: new Date(rows[0].created_at),
    };
  }
}
