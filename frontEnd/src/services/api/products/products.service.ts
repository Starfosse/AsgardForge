import { apiClient } from "../client";

export const productsService = {
  addProduct: (productFormData: FormData) => {
    apiClient.fetch<null>("/products/addProduct", {
      method: "POST",
      body: productFormData,
    });
  },
};
