import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
import { DATABASE_CONNECTION } from 'src/database/database.module';

@Injectable()
export class CategoryRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private connection: Connection,
  ) {}
  async create(category: string, description: string) {
    try {
      const [rows] = await this.connection.query(
        'INSERT INTO categories (namen, description) VALUES (?, ?)',
        [category, description],
      );
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error('Could not create category');
    }
  }
  async findCategory(category: string) {
    try {
      const [rows]: any = await this.connection.query(
        'SELECT * FROM categories WHERE name = ?',
        [category],
      );
      return rows[0];
    } catch (error) {
      console.error(error);
      throw new Error('Could not find category');
    }
  }

  async findAll() {
    try {
      const [rows]: any = this.connection.query('SELECT * from categories');
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error('Could not find categories');
    }
  }

  async findCategoryByName(name: string) {
    try {
      const [rows]: any = await this.connection.query(
        'SELECT * FROM categories WHERE name = ?',
        [name],
      );
      return rows[0];
    } catch (error) {
      console.error(error);
      throw new Error('Could not find category');
    }
  }
}
