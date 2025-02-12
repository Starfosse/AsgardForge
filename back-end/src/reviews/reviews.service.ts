import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewsRepository } from './reviews.repository';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class ReviewsService {
  constructor(
    private reviewRepository: ReviewsRepository,
    private userRepository: UserRepository,
  ) {}

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

  async getReviews(productId: number) {
    try {
      const reviewsWithCustomersNames = [];
      const reviews =
        await this.reviewRepository.getAllReviewsByProductId(productId);
      for (const review of reviews) {
        const reviewWithCustomerName = {
          ...review,
          customerName: (await this.userRepository.findById(review.user_id))
            .first_name,
        };
        reviewsWithCustomersNames.push(reviewWithCustomerName);
      }
      return reviewsWithCustomersNames;
    } catch (error) {
      throw new Error('Error getting reviews');
    }
  }
}
