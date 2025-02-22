import { apiClient } from "../client";
import Product from "../products/types";
import Collection from "./types";

export const collectionsService = {
  getProductsByCollection: (id: number) => {
    return apiClient.fetch<Product[]>(`/collection/${id}/products`, {
      method: "GET",
    });
  },
  getCollections: () => {
    return apiClient.fetch<Collection[]>("/collection", { method: "GET" });
  },
  getCollection: (id: number) => {
    return apiClient.fetch<Collection>(`/collection/${id}`, { method: "GET" });
  },
  createCollection: (collection: Collection) => {
    return apiClient.fetch("/collection", {
      method: "POST",
      body: JSON.stringify(collection),
    });
  },
  updateCollection: (id: number, collection: Collection) => {
    return apiClient.fetch(`/collection/${id}`, {
      method: "PUT",
      body: JSON.stringify(collection),
    });
  },
  deleteCollection: (id: number) => {
    return apiClient.fetch(`/collection/${id}`, { method: "DELETE" });
  },
};
