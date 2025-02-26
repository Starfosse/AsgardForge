import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomerRepository } from './customer.repository';
import { Customer } from './customer.service';
import { CurrentUser } from './decorators/current-customer.decorator';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerRepository: CustomerRepository) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getMe(@CurrentUser() user: Customer) {
    console.log('customer ===', user);
    const customerInfo = await this.customerRepository.findById(user.id);
    return { ...customerInfo };
  }
}
