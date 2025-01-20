import { Injectable } from '@nestjs/common';
import { ProductsRepository } from 'src/products/products.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  findProductsByCategory(name: string) {
    return this.productsRepository.findProductsByCategory(name);
  }
}
