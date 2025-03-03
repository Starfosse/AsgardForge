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
    console.log('productId1', productId);
    console.log('customer1', customer);
    return this.wishlistRepository.create(+productId, customer.id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@CurrentUser() customer) {
    console.log('customer2', customer);
    return this.wishlistRepository.findAll(customer.id);
  }

  @Get(':productId')
  @UseGuards(AuthGuard('jwt'))
  async findOne(
    @CurrentUser() customer,
    @Param('productId') productId: string,
  ) {
    console.log('productId3', productId);
    console.log('customer3', customer);
    const response = await this.wishlistRepository.findOne(
      +productId,
      customer.id,
    );
    if (response) {
      return true;
    }
    return false;
  }

  @Delete(':productId')
  @UseGuards(AuthGuard('jwt'))
  remove(@CurrentUser() customer, @Param('productId') productId: string) {
    return this.wishlistRepository.remove(+productId, customer.id);
  }
}
