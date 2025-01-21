export default interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  promotionPrice: number;
  stock: number;
  category: string;
  alertStock: number;
  images: File[];
  details: string;
  specifications: string;
  dimensions: string;
  weight: number;
  material: string;
}
