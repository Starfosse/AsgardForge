import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewsRepository } from './reviews.repository';

@Injectable()
export class ReviewsService {
  constructor(private reviewRepository: ReviewsRepository) {}

  async createReview(createReviewDto: CreateReviewDto) {
    try {
      console.log('createReviewDto === ', createReviewDto);
      const reviewCreatedId = await this.reviewRepository.createReview(
        createReviewDto.productId,
        createReviewDto.userId,
        createReviewDto.rating,
        createReviewDto.review,
      );
      console.log('reviewCreatedId === ', reviewCreatedId);
      const review =
        await this.reviewRepository.findReviewById(reviewCreatedId);
      console.log('review === ', review);
      return review;
    } catch (error) {
      console.log('error === ', error);
      throw new Error('Error creating review');
    }
  }
}
