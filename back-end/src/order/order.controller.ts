import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderRepository: OrderRepository,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body()
    requestData: {
      orderData: CreateOrderDto;
      cart: CreateOrderItemDto[];
    },
  ) {
    const { orderData, cart } = requestData;
    return this.orderService.create(orderData, cart);
  }

  // @Get()
  // findAll() {
  //   return this.orderService.findAll();
  // }

  @Get('user/:userId')
  @UseGuards(AuthGuard('jwt'))
  findAllByUserId(@Param('userId') userId: string) {
    return this.orderRepository.findAllByUserId(+userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.orderRepository.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.orderService.update(+id, updateOrderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.orderService.remove(+id);
  // }
}
