import { Injectable } from '@nestjs/common';
import { ProductsRepository } from 'src/products/products.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  findProductsByCategory(id: number) {
    return this.productsRepository.findProductsByCategory(id);
  }
}
