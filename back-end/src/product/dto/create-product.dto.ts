export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  promotion_price: number;
  stock: number;
  collection: string;
  alertStock: number;
  specifications: string;
  dimensions: string;
  weight: number;
  material: string;
  featured: boolean;
}
