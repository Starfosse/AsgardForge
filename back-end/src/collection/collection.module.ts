import { Module } from '@nestjs/common';
import { CategoryController } from './collection.controller';
import { ProductsModule } from 'src/products/products.module';
import { CollectionService } from './collection.service';

@Module({
  imports: [ProductsModule],
  controllers: [CategoryController],
  providers: [CollectionService, CollectionService],
})
export class CollectionModule {}
