import { Injectable } from '@nestjs/common';
import { ProductsRepository } from 'src/products/products.repository';

@Injectable()
export class CollectionService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  async findProductsByCollection(id: number) {
    const productsWithImage = [];
    const products = await this.productsRepository.findProductsByCollection(id);
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
