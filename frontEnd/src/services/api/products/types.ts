export interface Images {
  id: number;
  product_id: number;
  image_order: number;
  image_path: string;
}

export default interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  promotion_price: number;
  stock: number;
  collection: string;
  alertStock: number;
  images?: Images[];
  main_image?: string;
  imagesFiles?: File[];
  specifications: string;
  dimensions: string;
  weight: number;
  material: string;
  featured: boolean;
}
