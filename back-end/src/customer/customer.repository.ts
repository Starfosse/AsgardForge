import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
import { DATABASE_CONNECTION } from '../../src/database/database.module';
import { Customer } from './customer.service';

@Injectable()
export class CustomerRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly connection: Connection,
  ) {}

  async findByGoogleId(googleId: string): Promise<Customer | null> {
    const [rows]: any = await this.connection.query(
      'SELECT * FROM customers WHERE google_id = ?',
      [googleId],
    );
    const customer = rows[0];
    if (!customer) return null;

    return {
      id: customer.id,
      google_id: customer.google_id,
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.email,
      access_token: customer.access_token || '',
      created_at: new Date(customer.created_at),
    };
  }

  async create(
    customerData: Omit<Customer, 'id' | 'created_at'>,
  ): Promise<Customer> {
    const [result]: any = await this.connection.query(
      'INSERT INTO customers (google_id, email, first_name, last_name, created_at) VALUES (?, ?, ?, ?, ?)',
      [
        customerData.google_id,
        customerData.email,
        customerData.first_name,
        customerData.last_name,
        new Date(),
      ],
    );

    const [rows]: any = await this.connection.query(
      'SELECT * FROM customers WHERE id = ?',
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

  async findById(id: number): Promise<Customer | null> {
    try {
      const [rows]: any = await this.connection.execute(
        'SELECT * FROM customers WHERE id = ?',
        [id],
      );
      const customer = rows[0];
      if (!customer) return null;

      return customer;
    } catch (error) {
      console.error('Error finding customer by id:', error);
      throw new Error('Could not find customer by id');
    }
  }
}
