export class CreateContactDto {
  id: string;
  subject: string;
  orderId: string;
  content: string;
  sender: string;
  createdAt: Date;
  userId: number;
}
