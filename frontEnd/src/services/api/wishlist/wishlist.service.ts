import { apiClient } from "../client";
import { WishlistProduct } from "./types";

export const wishlistService = {
  addToWishlist: async (productId: string) => {
    await apiClient.fetch(`/api/wishlists/${productId}`, { method: "POST" });
  },
  removeFromWishlist: async (productId: string) => {
    await apiClient.fetch(`/api/wishlists/${productId}`, {
      method: "DELETE",
    });
  },
  isWishlisted: async (productId: string) => {
    const response = await apiClient.fetch(`/api/wishlists/${productId}`, {
      method: "GET",
    });
    return response;
  },
  getWishlistProducts: async () => {
    const response = await apiClient.fetch<WishlistProduct[]>(
      "/api/wishlists",
      {
        method: "GET",
      }
    );
    return response;
  },
};
