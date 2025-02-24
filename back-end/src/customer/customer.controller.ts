import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Customer } from './customer.service';
import { CustomerRepository } from './customer.repository';
import { CurrentCustomer } from './decorators/current-customer.decorator';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerRepository: CustomerRepository) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getMe(@CurrentCustomer() customer: Customer) {
    const customerInfo = await this.customerRepository.findById(customer.id);
    return { ...customerInfo };
  }
}
