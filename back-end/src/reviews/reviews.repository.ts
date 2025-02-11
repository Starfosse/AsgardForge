import { Inject } from '@nestjs/common';
import { Connection } from 'mysql2';
import { DATABASE_CONNECTION } from 'src/database/database.module';

export class ReviewsRepository {
  constructor(@Inject(DATABASE_CONNECTION) private connection: Connection) {}

  async findReviewById(productId: number) {
    try {
      const [rows]: any = await this.connection.execute(
        'SELECT * FROM product_reviews WHERE id = ?',
        [productId],
      );
      return rows[0];
    } catch (error) {
      console.log('error === ', error);
      throw new Error('Error creating review');
    }
  }

  async getAllReviewsByProductId(reviewId: number) {
    try {
      const [rows]: any = await this.connection.execute(
        'SELECT * FROM product_reviews WHERE product_id = ?',
        [reviewId],
      );
      return rows;
    } catch (error) {
      console.log('error === ', error);
      throw new Error('Error selecting reviews');
    }
  }

  async createReview(
    productId: number,
    userId: number,
    rating: number,
    review: string,
  ) {
    const [result]: any = await this.connection.execute(
      'INSERT INTO product_reviews (product_id, user_id, rating, review) VALUES (?, ?, ?, ?)',
      [productId, userId, rating, review],
    );
    return result.insertId;
  }
}
