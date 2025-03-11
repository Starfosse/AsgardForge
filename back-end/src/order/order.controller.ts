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

  @Get('user/:userId')
  findAllByUserId(@Param('userId') userId: string) {
    return this.orderRepository.findAllByUserId(+userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderRepository.findOne(+id);
  }
}
