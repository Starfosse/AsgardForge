import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './order.repository';
import { CreateOrderItemDto } from './dto/create-order-item.dto';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}
  async create(order: CreateOrderDto, cart: CreateOrderItemDto[]) {
    const orderId = await this.orderRepository.createOrder(order);
    await this.orderRepository.createOrderItem(cart, orderId);
    return orderId;
  }
}
