import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ProductsRepository } from './products.repository';

@Module({
  imports: [CloudinaryModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
