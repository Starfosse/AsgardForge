import { ReviewsCustomers } from "@/pages/client/Product";
import { apiClient } from "../client";
import Product from "./types";

export const productsService = {
  addProduct: (formData: FormData) => {
    return apiClient.upload("/products", formData, "POST");
  },
  getProducts: () => {
    return apiClient.fetch<Product[]>("/products", { method: "GET" });
  },

  deleteProduct: (id: number) => {
    return apiClient.fetch(`/products/${id}`, { method: "DELETE" });
  },
  editProduct: (id: number, formData: FormData) => {
    return apiClient.upload(`/products/${id}`, formData, "PUT");
  },
  getProduct: (id: number) => {
    return apiClient.fetch<Product>(`/products/${id}`, {
      method: "GET",
    });
  },
  findImages: (id: number) => {
    return apiClient.fetch(`/products/images/${id}`, { method: "GET" });
  },
  findFirstImage: (id: number) => {
    return apiClient.fetch(`/products/images/first/${id}`, { method: "GET" });
  },

  addReview: (formData: any) => {
    return apiClient.fetch("/reviews", {
      method: "POST",
      body: JSON.stringify(formData),
    });
  },
  getReviews: (id: number) => {
    return apiClient.fetch<ReviewsCustomers[]>(`/reviews/${id}`, {
      method: "GET",
    });
  },
};
