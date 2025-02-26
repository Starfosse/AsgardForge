export interface OrderCommand {
  customerId: number | undefined;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  cardHolder: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}
