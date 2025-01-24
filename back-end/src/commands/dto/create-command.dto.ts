class commandItem {
  productId: number;
  quantity: number;
  price: number;
  promotionCode: string;
}

export class CreateCommandDto {
  promotionCode: string;
  totalAmount: number;
  userId: number;
  products: commandItem[];
}
