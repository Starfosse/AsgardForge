export class CreateOrderDto {
  readonly customerId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone: string;
  readonly address: string;
  readonly city: string;
  readonly zipCode: string;
  readonly total: number;
}
