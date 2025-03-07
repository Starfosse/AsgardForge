import CollectionsList from "@/components/CollectionsList";
import ProductsListAdmin from "@/components/ProductsListAdmin";
import CollectionForm from "@/forms/collection/CollectionForm";
import { collectionsService } from "@/services/api/collection/collections.service";
import Collection from "@/services/api/collection/types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [collectionForm, setCollectionForm] = useState<Collection>({
    id: undefined,
    name: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);
  const navigate = useNavigate();

  const handleCreateProduct = () => {
    navigate("/dashboard/products/new");
  };

  const handleSubmitCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        const collectionUpdated = await collectionsService.updateCollection(
          collectionForm.id!,
          collectionForm
        );
        setCollections(
          collections.map((collection) =>
            collection.id === collectionUpdated.id
              ? collectionUpdated
              : collection
          )
        );
      } else {
        const newCollection = await collectionsService.createCollection(
          collectionForm
        );
        setCollections([...collections, newCollection]);
      }
      setIsModalOpen(false);
      setCollectionForm({ name: "", description: "" });
    } catch (error) {
      console.error("Error with collection:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditModal = (collection: Collection) => {
    setCollectionForm({
      id: collection.id,
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
      <ProductsListAdmin />
      <CollectionsList
        openEditModal={openEditModal}
        collections={collections}
        setCollections={setCollections}
      />
      {isModalOpen && (
        <CollectionForm
          isSubmitting={isSubmitting}
          isEditMode={isEditMode}
          setIsModalOpen={setIsModalOpen}
          collectionForm={collectionForm}
          setCollectionForm={setCollectionForm}
          handleSubmitCategory={handleSubmitCategory}
        />
      )}
    </div>
  );
}
