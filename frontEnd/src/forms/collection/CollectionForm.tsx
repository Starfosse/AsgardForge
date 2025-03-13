import Collection from "@/services/api/collection/types";

interface CollectionFormProps {
  isSubmitting: boolean;
  isEditMode: boolean;
  setIsModalOpen: (value: boolean) => void;
  setCollectionForm: React.Dispatch<React.SetStateAction<Collection>>;
  collectionForm: Collection;
  handleSubmitCategory: (e: React.FormEvent) => void;
}

export default function CollectionForm({
  isSubmitting,
  isEditMode,
  setIsModalOpen,
  setCollectionForm,
  collectionForm,
  handleSubmitCategory,
}: CollectionFormProps) {
  return (
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
            <label className="block text-gray-400 mb-2" htmlFor="description">
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
  );
}
