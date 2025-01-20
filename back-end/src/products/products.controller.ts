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
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly productsRepository: ProductsRepository,
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
        // price: createProductDto.price
        //   ? parseFloat(createProductDto.price.toString())
        //   : 0,
        // promotionPrice: createProductDto.promotionPrice
        //   ? parseFloat(createProductDto.promotionPrice.toString())
        //   : 0,
        // stock: createProductDto.stock
        //   ? parseInt(createProductDto.stock.toString())
        //   : 0,
        // alertStock: createProductDto.alertStock
        //   ? parseInt(createProductDto.alertStock.toString())
        //   : 0,
        // weight: createProductDto.weight
        //   ? parseFloat(createProductDto.weight.toString())
        //   : 0,
      };
      const imageUrls = images ? images.map((image) => image.path) : [];
      const imageUploaded =
        await this.cloudinaryService.uploadImages(imageUrls);
      const product = {
        ...productData,
        images: imageUploaded.map((image) => image.url),
      };
      return this.productsService.create(product);
    } catch (error) {
      console.error(error);
      throw new Error('Could not create product');
    }
  }

  @Get()
  async findAll() {
    try {
      const products = await this.productsRepository.findAll();
      let productsWithImages = [];
      for (const product of products as any) {
        const productImages =
          await this.productsRepository.findAllImagesFromProduct(product.id);
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
      const product = await this.productsRepository.findProduct(id);
      const productImages =
        await this.productsRepository.findAllImagesFromProduct(product.id);
      return {
        ...product,
        images: productImages,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Could not find product');
    }
  }

  @Delete(':id')
  async remove(@Param('id') name: number) {
    return this.productsRepository.deleteProduct(name);
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
        // price: updateProductDto.price
        //   ? parseFloat(updateProductDto.price.toString())
        //   : 0,
        // promotionPrice: updateProductDto.promotionPrice
        //   ? parseFloat(updateProductDto.promotionPrice.toString())
        //   : 0,
        // stock: updateProductDto.stock
        //   ? parseInt(updateProductDto.stock.toString())
        //   : 0,
        // alertStock: updateProductDto.alertStock
        //   ? parseInt(updateProductDto.alertStock.toString())
        //   : 0,
        // weight: updateProductDto.weight
        //   ? parseFloat(updateProductDto.weight.toString())
        //   : 0,
      };
      const imageUrls = images ? images.map((image) => image.path) : [];
      const imageUploaded =
        await this.cloudinaryService.uploadImages(imageUrls);
      const product = {
        ...productData,
        images: imageUploaded.map((image) => image.url),
      };
      return await this.productsService.updateProduct(product, parseInt(id));
    } catch (error) {
      console.error(error);
      throw new Error('Could not update product');
    }
  }
}
