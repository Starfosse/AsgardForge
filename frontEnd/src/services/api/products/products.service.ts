import { Category } from "@/pages/admin/ProductsList";
import { apiClient } from "../client";
import Product from "./types";
import { ReviewsCustomers } from "@/pages/client/Product";

export const productsService = {
  addProduct: (formData: FormData) => {
    return apiClient.upload("/products", formData, "POST");
  },
  getProducts: () => {
    return apiClient.fetch<Product[]>("/products", { method: "GET" });
  },
  getProductsByCategory: (id: number) => {
    return apiClient.fetch<Product[]>(`/category/${id}/products`, {
      method: "GET",
    });
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
  getCategories: () => {
    return apiClient.fetch<Category[]>("/category", { method: "GET" });
  },
  getCategory: (id: number) => {
    return apiClient.fetch<Category>(`/category/${id}`, { method: "GET" });
  },
  createCategory: (category: Category) => {
    return apiClient.fetch("/category", {
      method: "POST",
      body: JSON.stringify(category),
    });
  },
  updateCategory: (id: number, category: Category) => {
    return apiClient.fetch(`/category/${id}`, {
      method: "PUT",
      body: JSON.stringify(category),
    });
  },
  deleteCategory: (id: number) => {
    return apiClient.fetch(`/category/${id}`, { method: "DELETE" });
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
