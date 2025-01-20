import { apiClient } from "../client";

export const productsService = {
  addProduct: (formData: FormData) => {
    apiClient.upload("/products", formData);
  },
};
