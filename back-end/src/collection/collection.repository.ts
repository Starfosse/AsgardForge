import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
import { DATABASE_CONNECTION } from 'src/database/database.module';

@Injectable()
export class CollectionRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private connection: Connection,
  ) {}
  async create(collection: string, description: string) {
    try {
      const [result]: any = await this.connection.query(
        'INSERT INTO collections (name, description) VALUES (?, ?)',
        [collection, description],
      );
      return result.insertId;
    } catch (error) {
      console.error(error);
      throw new Error('Could not create collection');
    }
  }
  async findCollection(id: number) {
    try {
      const [rows]: any = await this.connection.query(
        'SELECT * FROM collections WHERE id = ?',
        [id],
      );
      return rows[0];
    } catch (error) {
      console.error(error);
      throw new Error('Could not find collection');
    }
  }

  async findAll() {
    try {
      const [rows]: any = await this.connection.query(
        'SELECT * from collections',
      );
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error('Could not find collections');
    }
  }

  async update(collection: string, newCollection: string, description: string) {
    try {
      const [result]: any = await this.connection.query(
        'UPDATE collections SET name = ?, description = ? WHERE name = ?',
        [newCollection, description, collection],
      );
      return result.insertId;
    } catch (error) {
      console.error(error);
      throw new Error('Could not update collection');
    }
  }

  async delete(id: number) {
    try {
      const [result]: any = await this.connection.query(
        'DELETE FROM collections WHERE id = ?',
        [id],
      );
      return result.affectedRows;
    } catch (error) {
      console.error(error);
      throw new Error('Could not delete collection');
    }
  }
}
