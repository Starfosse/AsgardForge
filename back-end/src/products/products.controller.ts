import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ProductsRepository } from './products.repository';

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
        price: parseFloat(createProductDto.price.toString()),
        promotionPrice: parseFloat(createProductDto.promotionPrice.toString()),
        stock: parseInt(createProductDto.stock.toString()),
        alertStock: parseInt(createProductDto.alertStock.toString()),
        weight: parseFloat(createProductDto.weight.toString()),
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
      return this.productsRepository.findAll();
    } catch (error) {
      console.error(error);
      throw new Error('Could not find products');
    }
  }

  @Get(':name')
  async findOne(@Param('name') name: string) {
    try {
      return this.productsRepository.findProductByName(name);
    } catch (error) {
      console.error(error);
      throw new Error('Could not find product');
    }
  }

  @Delete(':name')
  async remove(@Param('name') name: string) {
    return this.productsRepository.deleteProduct(name);
  }
}
