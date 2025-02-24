import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';

export interface Customer {
  id: number;
  google_id: string;
  first_name: string;
  last_name: string;
  email: string;
  access_token?: string;
  created_at: Date;
}

@Injectable()
@Injectable()
export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}

  async findOrCreateCustomer(
    customerDetails: Omit<Customer, 'id' | 'created_at'>,
  ): Promise<Customer> {
    let customer = await this.customerRepository.findByGoogleId(
      customerDetails.google_id,
    );
    if (!customer) {
      customer = await this.customerRepository.create(customerDetails);
    }
    return customer;
  }
}
