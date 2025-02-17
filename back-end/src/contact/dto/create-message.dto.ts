export class CreateMessageDto {
  content: string;
  conversationId: number;
  sender: string;
  createdAt: Date;
}
