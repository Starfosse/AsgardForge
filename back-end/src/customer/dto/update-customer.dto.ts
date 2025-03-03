import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto {
  id: number;
  googleId: string;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}
