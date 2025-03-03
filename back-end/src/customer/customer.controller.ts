import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomerRepository } from './customer.repository';
import { Customer } from './customer.service';
import { CurrentUser } from './decorators/current-customer.decorator';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerRepository: CustomerRepository) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getMe(@CurrentUser() user: Customer) {
    const customerInfo = await this.customerRepository.findById(user.id);
    return { ...customerInfo };
  }

  @Put('update')
  @UseGuards(AuthGuard('jwt'))
  async updateProfile(
    @CurrentUser() user: Customer,
    @Body() data: UpdateCustomerDto,
  ) {
    await this.customerRepository.update(user.id, data);
  }
}
