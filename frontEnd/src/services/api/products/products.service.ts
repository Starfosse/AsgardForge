import { apiClient } from "../client";
import Product from "./types";

export const productsService = {
  addProduct: (formData: FormData) => {
    apiClient.upload("/products", formData);
  },
  getProducts: () => {
    return apiClient.fetch<Product[]>("/products", { method: "GET" });
  },
};
