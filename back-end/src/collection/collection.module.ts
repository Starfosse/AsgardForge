import { Module } from '@nestjs/common';
import { ProductModule } from 'src/product/product.module';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';
import { CollectionRepository } from './collection.repository';

@Module({
  imports: [ProductModule],
  controllers: [CollectionController],
  providers: [CollectionService, CollectionRepository],
})
export class CollectionModule {}
