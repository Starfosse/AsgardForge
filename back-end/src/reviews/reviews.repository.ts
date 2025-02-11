import { Inject } from '@nestjs/common';
import { Connection } from 'mysql2';

export class ReviewsRepository {
  constructor(@Inject('DATABASE_CONNECTION') private connection: Connection) {}

  async findReviewById(productId: number) {
    const [rows]: any = await this.connection.execute(
      'SELECT * FROM reviews WHERE id = ?',
      [productId],
    );
    return rows;
  }

  async getAllReviewsByProductId(reviewId: number) {
    const [rows]: any = await this.connection.execute(
      'SELECT * FROM reviews WHERE product_id = ?',
      [reviewId],
    );
    return rows;
  }

  async createReview(
    productId: number,
    userId: number,
    rating: number,
    review: string,
  ) {
    const [result]: any = await this.connection.execute(
      'INSERT INTO reviews (product_id, user_id, rating, review) VALUES (?, ?, ?, ?)',
      [productId, userId, rating, review],
    );
    return result.insertId;
  }
}
