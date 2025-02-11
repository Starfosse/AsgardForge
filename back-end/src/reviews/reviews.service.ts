import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewsRepository } from './reviews.repository';

@Injectable()
export class ReviewsService {
  constructor(private reviewRepository: ReviewsRepository) {}

  async createReview(createReviewDto: CreateReviewDto) {
    try {
      const reviewCreatedId = await this.reviewRepository.createReview(
        createReviewDto.productId,
        createReviewDto.userId,
        createReviewDto.rating,
        createReviewDto.review,
      );
      const review =
        await this.reviewRepository.findReviewById(reviewCreatedId);
      return review;
    } catch (error) {
      throw new Error('Error creating review');
    }
  }
}
