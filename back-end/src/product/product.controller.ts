import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly productRepository: ProductRepository,
  ) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    try {
      const productData = {
        ...createProductDto,
        price: createProductDto.price ? createProductDto.price : 0,
        promotionPrice: createProductDto.promotion_price
          ? createProductDto.promotion_price
          : 0,
        stock: createProductDto.stock ? createProductDto.stock : 0,
        alertStock: createProductDto.alertStock
          ? createProductDto.alertStock
          : 0,
        weight: createProductDto.weight ? createProductDto.weight : 0,
        featured: createProductDto.featured ? createProductDto.featured : false,
      };
      const imageUrls = images ? images.map((image) => image.path) : [];
      const imageUploaded =
        await this.cloudinaryService.uploadImages(imageUrls);
      const product = {
        ...productData,
        images: imageUploaded.map((image) => image.url),
      };
      return this.productService.create(product);
    } catch (error) {
      console.error(error);
      throw new Error('Could not create product');
    }
  }

  @Get()
  async findAll() {
    try {
      const products = await this.productRepository.findAll();
      const productsWithImages = [];
      for (const product of products as any) {
        const productImages =
          await this.productRepository.findAllImagesFromProduct(product.id);
        productsWithImages.push({
          ...product,
          images: productImages,
        });
      }
      return productsWithImages;
    } catch (error) {
      console.error(error);
      throw new Error('Could not find products');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const product = await this.productRepository.findProduct(id);
      const productImages =
        await this.productRepository.findAllImagesFromProduct(product.id);
      return {
        ...product,
        images: productImages,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Could not find product');
    }
  }

  @Get('images/:id')
  async findImages(@Param('id') id: number) {
    try {
      return await this.productRepository.findAllImagesFromProduct(id);
    } catch (error) {
      console.error(error);
      throw new Error('Could not find images');
    }
  }

  @Get('images/first/:id')
  async findFirstImage(@Param('id') id: number) {
    try {
      return await this.productRepository.findFirstImageFromProduct(id);
    } catch (error) {
      console.error(error);
      throw new Error('Could not find image');
    }
  }

  @Delete(':id')
  async remove(@Param('id') name: number) {
    return this.productRepository.deleteProduct(name);
  }

  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    try {
      const productData = {
        ...updateProductDto,
        price: updateProductDto.price ? updateProductDto.price : 0,
        promotionPrice: updateProductDto.promotion_price
          ? updateProductDto.promotion_price
          : 0,
        stock: updateProductDto.stock ? updateProductDto.stock : 0,
        alertStock: updateProductDto.alertStock
          ? updateProductDto.alertStock
          : 0,
        weight: updateProductDto.weight ? updateProductDto.weight : 0,
      };
      const imageUrls = images ? images.map((image) => image.path) : [];
      const imageUploaded =
        await this.cloudinaryService.uploadImages(imageUrls);
      const product = {
        ...productData,
        images: imageUploaded.map((image) => image.url),
      };
      return await this.productService.updateProduct(product, parseInt(id));
    } catch (error) {
      console.error(error);
      throw new Error('Could not update product');
    }
  }

  @Get('featured/all')
  async findFeaturedProducts() {
    try {
      const products = await this.productRepository.findFeaturedProducts();
      return products;
    } catch (error) {
      console.error(error);
      throw new Error('Could not find featured products');
    }
  }
}
