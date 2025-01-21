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
      const [result]: any = await this.connection.query(
        'INSERT INTO categories (name, description) VALUES (?, ?)',
        [category, description],
      );
      return result.insertId;
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
      const [rows]: any = await this.connection.query(
        'SELECT * from categories',
      );
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error('Could not find categories');
    }
  }

  async update(category: string, newCategory: string, description: string) {
    try {
      const [result]: any = await this.connection.query(
        'UPDATE categories SET name = ?, description = ? WHERE name = ?',
        [newCategory, description, category],
      );
      return result.affectedRows;
    } catch (error) {
      console.error(error);
      throw new Error('Could not update category');
    }
  }

  async delete(id: number) {
    try {
      const [result]: any = await this.connection.query(
        'DELETE FROM categories WHERE id = ?',
        [id],
      );
      return result.affectedRows;
    } catch (error) {
      console.error(error);
      throw new Error('Could not delete category');
    }
  }
}
