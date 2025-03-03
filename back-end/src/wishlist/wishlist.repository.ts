import { Inject } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
import { DATABASE_CONNECTION } from 'src/database/database.module';

export class WishlistRepository {
  constructor(@Inject(DATABASE_CONNECTION) private connection: Connection) {}

  async create(productId: number, customerId: number) {
    const [rows] = await this.connection.execute(
      'INSERT INTO wishlist_user_product (product_id, customer_id) VALUES (?, ?)',
      [productId, customerId],
    );
    return rows;
  }

  async findAll(customerId: number) {
    const [rows] = await this.connection.execute(
      'SELECT * FROM wishlist_user_product WHERE customer_id = ?',
      [customerId],
    );
    return rows;
  }

  async findOne(productId: number, customerId: number) {
    const [rows] = await this.connection.execute(
      'SELECT * FROM wishlist_user_product WHERE product_id = ? AND customer_id = ?',
      [productId, customerId],
    );
    return rows;
  }

  async remove(productId: number, customerId: number) {
    const [rows] = await this.connection.execute(
      'DELETE FROM wishlist_user_product WHERE product_id = ? AND customer_id = ?',
      [productId, customerId],
    );
    return rows;
  }
}
