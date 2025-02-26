import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderRepository: OrderRepository,
  ) {}

  @Post()
  create(
    @Body() requestData: { order: CreateOrderDto; cart: CreateOrderItemDto[] },
  ) {
    const { order, cart } = requestData;
    return this.orderService.create(order, cart);
  }

  // @Get()
  // findAll() {
  //   return this.orderService.findAll();
  // }

  @Get(':id')
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
