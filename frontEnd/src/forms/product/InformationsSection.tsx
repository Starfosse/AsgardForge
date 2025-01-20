import Product from "@/services/api/products/types";

interface InformationsSectionProps {
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  formData: Product;
  isUploading: boolean;
}

export default function InformationsSection({
  handleChange,
  formData,
  isUploading,
}: InformationsSectionProps) {
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
        <label className="font-bold text-gray-400 pb-1" htmlFor={"category"}>
          Catégorie
        </label>
        <select
          className="rounded-sm bg-[#272E48] outline-1 outline outline-gray-500 p-1 px-3 text-gray-400 focus:outline-sky-500"
          id={"category"}
          name={"category"}
          value={formData.category}
          onChange={handleChange}
          disabled={isUploading}
        >
          <option value="Armes">Armes</option>
          <option value="Armures">Armures</option>
          <option value="Outils">Outils</option>
          <option value="Rituels">Rituels</option>
        </select>
      </div>
    </div>
  );
}
