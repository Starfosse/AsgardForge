import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { productData } from './products.service';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class ProductsRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private connection: Connection,
  ) {}

  async createProduct(product: productData) {
    try {
      const [rows] = await this.connection.query(
        'SELECT * FROM categories WHERE name = ?',
        [product.category],
      );

      const result: any = await this.connection.query(
        'INSERT INTO products (name, description, price, promotion_price, stock, category_id, alert_stock, details, specifications, dimensions, weight, material) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          product.name,
          product.description,
          product.price,
          product.promotionPrice,
          product.stock,
          rows[0].id,
          product.alertStock,
          product.details,
          product.specifications,
          product.dimensions,
          product.weight,
          product.material,
        ],
      );

      return result[0].insertId;
    } catch (error) {
      console.error(error);
      throw new Error('Could not create product');
    }
  }

  async findProductByName(name: string) {
    try {
      const [rows] = await this.connection.query(
        'SELECT * FROM products WHERE name = ?',
        [name],
      );
      return rows[0];
    } catch (error) {
      console.error(error);
      throw new Error('Could not find product');
    }
  }

  async updateProduct(id: number, productUpdate: productData) {
    try {
      const [rows] = await this.connection.query(
        'SELECT * FROM products WHERE name = ?',
        [productUpdate.name],
      );

      await this.connection.query(
        'UPDATE products SET name = ?, description = ?, price = ?, promotion_price = ?, stock = ?, category_id = ?, alert_stock = ?, details = ?, specifications = ?, dimensions = ?, weight = ?, material = ? WHERE id = ?',
        [
          productUpdate.name,
          productUpdate.description,
          productUpdate.price,
          productUpdate.promotionPrice,
          productUpdate.stock,
          rows[0].id,
          productUpdate.alertStock,
          productUpdate.details,
          productUpdate.specifications,
          productUpdate.dimensions,
          productUpdate.weight,
          productUpdate.material,
          id,
        ],
      );
    } catch (error) {
      console.error(error);
      throw new Error('Could not update product');
    }
  }

  async deleteProduct(name: string) {
    try {
      await this.connection.query('DELETE FROM products WHERE name = ?', [
        name,
      ]);
    } catch (error) {
      console.error(error);
      throw new Error('Could not delete product');
    }
  }

  async createProductImage(productId: number, imageUrl: UploadApiResponse) {
    try {
      const [result] = await this.connection.query(
        'SELECT COALESCE(MAX(image_order), -1) as maxOrder FROM product_images WHERE product_id = ?',
        [productId],
      );

      const nextOrder = result[0].maxOrder + 1;

      // Ensuite on insère avec le nouvel ordre
      await this.connection.query(
        'INSERT INTO product_images (product_id, image_url, image_order) VALUES (?, ?, ?)',
        [productId, imageUrl, nextOrder],
      );
    } catch (error) {
      console.error(error);
      throw new Error('Could not create product image');
    }
  }

  async findAllImagesFromProduct(productId: number) {
    try {
      const [rows] = await this.connection.query(
        'SELECT * FROM product_images WHERE product_id = ? ORDER BY image_order ASC',
        [productId],
      );
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error('Could not find images');
    }
  }

  async createCategory(category: string, description: string) {
    try {
      await this.connection.query(
        'INSERT INTO categories (namen, description) VALUES (?, ?)',
        [category, description],
      );
    } catch (error) {
      console.error(error);
      throw new Error('Could not create category');
    }
  }

  async findCategory(category) {
    try {
      const [rows]: any = await this.connection.query(
        'SELECT * FROM categories WHERE name = ?',
        [category],
      );
      return rows[0];
    } catch (error) {
      console.error(error);
      throw new Error('Could not find category');
    }
  }
}
