import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../../src/customer/customer.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService {
  constructor(
    private reviewRepository: ReviewRepository,
    private customerRepository: CustomerRepository,
  ) {}

  async createReview(createReviewDto: CreateReviewDto) {
    try {
      const reviewCreatedId = await this.reviewRepository.createReview(
        createReviewDto.productId,
        createReviewDto.customerId,
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

          customerName: (
            await this.customerRepository.findById(review.customer_id)
          ).first_name,
        };
        reviewsWithCustomersNames.push(reviewWithCustomerName);
      }
      return reviewsWithCustomersNames;
    } catch (error) {
      throw new Error('Error getting reviews');
    }
  }
}
