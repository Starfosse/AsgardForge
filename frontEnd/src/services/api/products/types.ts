interface Images {
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
  promotionPrice: number;
  stock: number;
  category: string;
  alertStock: number;
  images?: Images[];
  imagesFiles?: File[];
  details: string;
  specifications: string;
  dimensions: string;
  weight: number;
  material: string;
}
//product
