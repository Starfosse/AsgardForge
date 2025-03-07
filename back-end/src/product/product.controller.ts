import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/customer/decorators/current-customer.decorator';
import { Customer } from 'src/customer/entities/customer.entity';

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
  @UseGuards(AuthGuard('jwt'))
  async create(
    @CurrentUser() user: Customer,
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    if (user.email !== process.env.ADMIN_USER_EMAIL) {
      throw new Error('You are not authorized to create a collection');
    }
    try {
      const productData = {
        ...createProductDto,
        price: createProductDto.price ? createProductDto.price : 0,
        promotionPrice: createProductDto.promotionPrice
          ? createProductDto.promotionPrice
          : 0,
        stock: createProductDto.stock ? createProductDto.stock : 0,
        alertStock: createProductDto.alertStock
          ? createProductDto.alertStock
          : 0,
        weight: createProductDto.weight ? createProductDto.weight : 0,
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
      let productsWithImages = [];
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

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@CurrentUser() user: Customer, @Param('id') name: number) {
    if (user.email !== process.env.ADMIN_USER_EMAIL) {
      throw new Error('You are not authorized to create a collection');
    }
    return this.productRepository.deleteProduct(name);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
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
    @CurrentUser() user: Customer,
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    if (user.email !== process.env.ADMIN_USER_EMAIL) {
      throw new Error('You are not authorized to create a collection');
    }
    try {
      const productData = {
        ...updateProductDto,
        price: updateProductDto.price ? updateProductDto.price : 0,
        promotionPrice: updateProductDto.promotionPrice
          ? updateProductDto.promotionPrice
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
}
