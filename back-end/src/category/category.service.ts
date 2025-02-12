import { Injectable } from '@nestjs/common';
import { ProductsRepository } from 'src/products/products.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  async findProductsByCategory(id: number) {
    const productsWithImage = [];
    const products = await this.productsRepository.findProductsByCategory(id);
    for (const values of Object.values(products)) {
      const product = values;
      const images = await this.productsRepository.findFirstImageFromProduct(
        values.id,
      );
      productsWithImage.push({
        ...product,
        images,
      });
    }
    return productsWithImage;
  }
}
