export class CreateMessageDto {
  content: string;
  conversationId: number;
  sender: string;
  timestamp: Date;
}
