import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewsRepository } from './reviews.repository';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly reviewsRepository: ReviewsRepository,
  ) {}

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    console.log('createReviewDto === ', createReviewDto);
    return this.reviewsService.createReview(createReviewDto);
  }

  // @Get()
  // findAll() {
  //   return this.reviewsService.findAll();
  // }

  @Get(':productId')
  async indOne(@Param('productId') productId: string) {
    return this.reviewsRepository.getAllReviewsByProductId(+productId); // tous les reveiw d'un product
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
  //   return this.reviewsService.update(+id, updateReviewDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.reviewsService.remove(+id);
  // }
}
