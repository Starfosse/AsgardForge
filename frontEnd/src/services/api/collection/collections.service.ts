import { apiClient } from "../client";
import Product from "../products/types";
import Collection from "./types";

export const collectionsService = {
  getProductsByCollection: (id: number) => {
    return apiClient.fetch<Product[]>(`/api/collections/${id}/products`, {
      method: "GET",
    });
  },
  getCollections: () => {
    return apiClient.fetch<Collection[]>("/api/collections", { method: "GET" });
  },
  getCollection: (id: number) => {
    return apiClient.fetch<Collection>(`/api/collections/${id}`, {
      method: "GET",
    });
  },
  createCollection: (collection: Collection) => {
    return apiClient.fetch("/api/collections", {
      method: "POST",
      body: JSON.stringify(collection),
    });
  },
  updateCollection: (id: number, collection: Collection) => {
    return apiClient.fetch(`/api/collections/${id}`, {
      method: "PUT",
      body: JSON.stringify(collection),
    });
  },
  deleteCollection: (id: number) => {
    return apiClient.fetch(`/api/collections/${id}`, { method: "DELETE" });
  },
};
