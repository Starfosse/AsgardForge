import { collectionsService } from "@/services/api/collection/collections.service";
import Collection from "@/services/api/collection/types";
import Product from "@/services/api/products/types";
import { useEffect, useState } from "react";

interface InformationsSectionProps {
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  formData: Product;
  isUploading: boolean;
  setFormData: React.Dispatch<React.SetStateAction<Product>>;
}

export default function InformationsSection({
  handleChange,
  formData,
  isUploading,
  setFormData,
}: InformationsSectionProps) {
  const [categories, setCategories] = useState<Collection[]>([]);

  useEffect(() => {
    const handleGetCategories = async () => {
      try {
        const response = await collectionsService.getCollections();
        setCategories(response);
        setFormData((prev) => ({ ...prev, collection: response[0].name }));
      } catch (error) {
        console.error(error);
      }
    };
    handleGetCategories();
  }, [setFormData]);

  return (
    <div>
      <div className="mb-4 flex flex-col">
        <label className="font-bold text-gray-400 pb-1" htmlFor={"name"}>
          Nom
        </label>
        <input
          className="rounded-sm bg-[#272E48] outline-1 outline outline-gray-500 p-1 px-3 text-gray-400  focus:outline-sky-500"
          type="text"
          id={"name"}
          name={"name"}
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isUploading}
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label className="font-bold text-gray-400 pb-1" htmlFor={"description"}>
          Description
        </label>
        <textarea
          className="rounded-sm bg-[#272E48] outline-1 outline outline-gray-500 p-1 px-3 text-gray-400 focus:outline-sky-500"
          id={"description"}
          name={"description"}
          value={formData.description}
          onChange={handleChange}
          required
          rows={3}
          disabled={isUploading}
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label className="font-bold text-gray-400 pb-1" htmlFor={"collection"}>
          Collection
        </label>
        <select
          className="rounded-sm bg-[#272E48] outline-1 outline outline-gray-500 p-1 px-3 text-gray-400 focus:outline-sky-500"
          id={"collection"}
          name={"collection"}
          value={formData.collection}
          onChange={handleChange}
          disabled={isUploading}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
