export interface WishlistProduct {
  id: number;
  name: string;
  collectionId: number;
  collectionName: string;
  price: number;
  promotionPrice: number | null;
  imagePath: string;
}
