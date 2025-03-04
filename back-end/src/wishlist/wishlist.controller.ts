import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/customer/decorators/current-customer.decorator';
import { WishlistRepository } from './wishlist.repository';
import { AuthGuard } from '@nestjs/passport';

@Controller('wishlists')
export class WishlistController {
  constructor(private readonly wishlistRepository: WishlistRepository) {}

  @Post(':productId')
  @UseGuards(AuthGuard('jwt'))
  create(@CurrentUser() customer, @Param('productId') productId: string) {
    return this.wishlistRepository.create(+productId, customer.id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@CurrentUser() customer) {
    const res = await this.wishlistRepository.findAll(customer.id);
    return res;
  }

  @Get(':productId')
  @UseGuards(AuthGuard('jwt'))
  async findOne(
    @CurrentUser() customer,
    @Param('productId') productId: string,
  ) {
    return await this.wishlistRepository.findOne(+productId, customer.id);
  }

  @Delete(':productId')
  @UseGuards(AuthGuard('jwt'))
  remove(@CurrentUser() customer, @Param('productId') productId: string) {
    return this.wishlistRepository.remove(+productId, customer.id);
  }
}
