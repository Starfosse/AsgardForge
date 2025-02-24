import { Module } from '@nestjs/common';
import { CustomerModule } from 'src/customer/customer.module';
import { ReviewController } from './review.controller';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
  imports: [CustomerModule],
})
export class ReviewModule {}
