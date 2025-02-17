export class Conversation {
  id: string;
  subject: string;
  status: string;
  createdAt: Date;
  messages: {
    id: string;
    sender: string;
    message: string;
    createdAt: Date;
  };
}
