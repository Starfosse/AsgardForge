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
    const [rows]: any = await this.connection.execute(
      "SELECT JSON_OBJECT('id', p.id, 'name', p.name, 'collectionId', c.id, 'collectionName', c.name, 'price', p.price, 'promotionPrice', p.promotion_price, 'imagePath', (SELECT image_path FROM product_images WHERE product_id = p.id ORDER BY image_order LIMIT 1)) as 'product' FROM wishlist_user_product wup JOIN products p ON wup.product_id = p.id LEFT JOIN collections c ON p.collection_id = c.id WHERE wup.customer_id = ?",
      [customerId],
    );
    return rows.map((row: any) => row.product);
  }

  async findOne(productId: number, customerId: number) {
    const [rows] = await this.connection.execute(
      'SELECT * FROM wishlist_user_product WHERE product_id = ? AND customer_id = ?',
      [productId, customerId],
    );
    return Array.isArray(rows) && rows.length > 0;
  }

  async remove(productId: number, customerId: number) {
    const [rows] = await this.connection.execute(
      'DELETE FROM wishlist_user_product WHERE product_id = ? AND customer_id = ?',
      [productId, customerId],
    );
    return rows;
  }
}
