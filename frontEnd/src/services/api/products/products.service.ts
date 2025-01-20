import { apiClient } from "../client";
import Product from "./types";

export interface Category {
  id?: number;
  name: string;
  description: string;
}

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
    return apiClient.fetch<Product>(`/products/${id}`, { method: "GET" });
  },
  getCategories: () => {
    return apiClient.fetch<Category[]>("/category", { method: "GET" });
  },
};
