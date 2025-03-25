import { collectionsService } from "@/services/api/collection/collections.service";
import LoadingScreen from "./LoadingScreen";
import React, { useEffect, useState } from "react";
import Collection from "@/services/api/collection/types";
import JustAdmin from "./JustAdmin";
import { useAuth } from "@/contexts/AuthContext";

interface CollectionsListProps {
  openEditModal: (collection: Collection) => void;
  collections: Collection[];
  setCollections: React.Dispatch<React.SetStateAction<Collection[]>>;
}

export default function CollectionsList({
  openEditModal,
  collections,
  setCollections,
}: CollectionsListProps) {
  const [loading, setLoading] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const { customer } = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await collectionsService.getCollections();
        setCollections(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [setCollections]);

  const handleDeleteCollection = async (collectionId: number) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")
    ) {
      if (customer?.email !== import.meta.env.VITE_ADMIN_EMAIL) {
        setAllowed(true);
        return;
      }
      try {
        await collectionsService.deleteCollection(collectionId);
        setCollections((prev) =>
          prev.filter((collection) => collection.id !== collectionId)
        );
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center text-white text-lg font-bold">
        Chargement des collections
      </div>
    );
  }

  if (allowed) {
    return <JustAdmin allowed={allowed} setAllowed={setAllowed} />;
  }

  return (
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
                <td className="px-6 py-4 text-sm space-x-3 mr-5">
                  <button
                    onClick={() => openEditModal(collection)}
                    className="text-blue-500 hover:text-blue-700 pl-3"
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
  );
}
