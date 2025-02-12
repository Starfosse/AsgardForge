import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { ReviewsController } from './reviews.controller';
import { ReviewsRepository } from './reviews.repository';
import { ReviewsService } from './reviews.service';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, ReviewsRepository],
  imports: [UserModule],
})
export class ReviewsModule {}
