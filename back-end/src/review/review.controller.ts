import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { ReviewRepository } from './review.repository';
import { Customer } from 'src/customer/entities/customer.entity';
import { CurrentUser } from 'src/customer/decorators/current-customer.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly reviewRepository: ReviewRepository,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @CurrentUser() user: Customer,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    if (user.email !== process.env.ADMIN_USER_EMAIL) {
      throw new Error('You are not authorized to create a collection');
    }
    return this.reviewService.createReview(createReviewDto);
  }

  @Get(':productId')
  async findOne(@Param('productId') productId: string) {
    return this.reviewService.getReviews(+productId);
  }
}
