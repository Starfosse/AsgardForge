import { ReviewsCustomers } from "@/pages/client/Product";
import { apiClient } from "../client";
import Product from "./types";

export const productsService = {
  addProduct: (formData: FormData) => {
    return apiClient.upload("/api/products", formData, "POST");
  },
  getProducts: () => {
    return apiClient.fetch<Product[]>("/api/products", { method: "GET" });
  },
  deleteProduct: (id: number) => {
    return apiClient.fetch(`/api/products/${id}`, { method: "DELETE" });
  },
  editProduct: (id: number, formData: FormData) => {
    return apiClient.upload(`/api/products/${id}`, formData, "PATCH");
  },
  getProduct: (id: number) => {
    return apiClient.fetch<Product>(`/api/products/${id}`, {
      method: "GET",
    });
  },
  findImages: (id: number) => {
    return apiClient.fetch(`/api/products/images/${id}`, { method: "GET" });
  },
  findFirstImage: (id: number) => {
    return apiClient.fetch(`/api/products/images/first/${id}`, {
      method: "GET",
    });
  },
  addReview: (formData: any) => {
    return apiClient.fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify(formData),
    });
  },
  getReviews: (id: number) => {
    return apiClient.fetch<ReviewsCustomers[]>(`/api/reviews/${id}`, {
      method: "GET",
    });
  },
  getFeaturedProducts: () => {
    return apiClient.fetch<Product[]>("/api/products/featured/all", {
      method: "GET",
    });
  },
};
