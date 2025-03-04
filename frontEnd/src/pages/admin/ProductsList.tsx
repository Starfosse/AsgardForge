import React, { useEffect, useState } from "react";
import { productsService } from "@/services/api";
import Product from "@/services/api/products/types";
import { useNavigate } from "react-router-dom";
import { collectionsService } from "@/services/api/collection/collections.service";
import Collection from "@/services/api/collection/types";

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [collectionForm, setCollectionForm] = useState<Collection>({
    name: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);
  const fetchProducts = async () => {
    const response = await productsService.getProducts();
    setProducts(response);
  };
  const fetchCategories = async () => {
    const response = await collectionsService.getCollections();
    setCollections(response);
  };
  const handleDelete = async (id: number) => {
    productsService.deleteProduct(id).then(() => {
      setProducts((prev) => prev.filter((product) => product.id !== id));
    });
  };
  const handleEdit = (id: number) => {
    navigate(`/dashboard/products/${id}`);
  };
  const handleCreateProduct = () => {
    navigate("/dashboard/products/new");
  };
  const handleSubmitCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await collectionsService.updateCollection(
          collectionForm.id!,
          collectionForm
        );
      } else {
        await collectionsService.createCollection(collectionForm);
      }
      setIsModalOpen(false);
      setCollectionForm({ name: "", description: "" });
      fetchCategories();
    } catch (error) {
      console.error("Error with collection:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const openEditModal = (collection: Collection) => {
    setCollectionForm({
      name: collection.name,
      description: collection.description,
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };
  const openCreateModal = () => {
    setCollectionForm({ name: "", description: "" });
    setIsEditMode(false);
    setIsModalOpen(true);
  };
  const handleDeleteCollection = async (collectionId: number) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")
    ) {
      try {
        await collectionsService.deleteCollection(collectionId);
        fetchCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };
  return (
    <div className="p-4 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-400">Liste des Produits</h1>
        <div className="space-x-4">
          <button
            onClick={handleCreateProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Créer un produit
          </button>
          <button
            onClick={openCreateModal}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Créer une catégorie
          </button>
        </div>
      </div>
      <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mb-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#272E48]">
            <tr>
              {[
                "Nom",
                "Description",
                "Prix",
                "Prix en promotion",
                "Stock",
                "Categorie",
                "Alerte de Stock",
                "Details",
                "Specifications",
                "Dimensions",
                "Poids",
                "Matériaux",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-sm font-bold text-gray-400"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-[#272E48]">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-[#0d101b] transition-colors duration-200"
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-400">
                  {product.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400 max-w-xs truncate">
                  {product.description}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  }).format(product.price)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-green-600">
                  {product.promotionPrice &&
                    new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    }).format(product.promotionPrice)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      product.stock > product.alertStock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                  {product.category}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                  {product.alertStock}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400 max-w-xs truncate">
                  {product.details}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400 max-w-xs truncate">
                  {product.specifications}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                  {product.dimensions}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                  {product.weight}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                  {product.material}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                  <button
                    className="text-red-500 hover:text-red-700 flex"
                    onClick={() => handleDelete(product.id ? product.id : 0)}
                  >
                    Supprimer
                  </button>
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEdit(product.id ? product.id : 0)}
                  >
                    Modifier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-400 mb-4">Catégories</h2>
        <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#272E48]">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-400">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-400">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-[#272E48]">
              {collections.map((collection) => (
                <tr
                  key={collection.name}
                  className="hover:bg-[#0d101b] transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {collection.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {collection.description}
                  </td>
                  <td className="px-6 py-4 text-sm space-x-3">
                    <button
                      onClick={() => openEditModal(collection)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteCollection(collection.id!)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#272E48] rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-400">
                {isEditMode ? "Modifier la catégorie" : "Nouvelle catégorie"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitCategory} className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2" htmlFor="name">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  value={collectionForm.name}
                  onChange={(e) =>
                    setCollectionForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full rounded-sm bg-[#1b2032] outline-1 outline outline-gray-500 p-1 px-3 text-gray-400 focus:outline-sky-500"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label
                  className="block text-gray-400 mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={collectionForm.description}
                  onChange={(e) =>
                    setCollectionForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full rounded-sm bg-[#1b2032] outline-1 outline outline-gray-500 p-1 px-3 text-gray-400 focus:outline-sky-500"
                  rows={3}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-500 rounded text-gray-400 hover:bg-[#1b2032]"
                  disabled={isSubmitting}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Traitement..."
                    : isEditMode
                    ? "Modifier"
                    : "Créer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
