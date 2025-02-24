import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../../src/cloudinary/cloudinary.module';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [CloudinaryModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductRepository],
})
export class ProductModule {}
