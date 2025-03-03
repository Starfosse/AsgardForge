import { apiClient } from "../client";

export const wishlistService = {
  addToWishlist: async (productId: string) => {
    console.log("productId2", productId);
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
};
