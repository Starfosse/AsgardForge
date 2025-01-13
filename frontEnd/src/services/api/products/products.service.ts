import { apiClient } from "../client";

export const productsService = {
  addProduct: (productFormData) => {
    apiClient.fetch<null>("/products/addProduct", {
      method: "POST",
      body: productFormData,
    });
  },
};
