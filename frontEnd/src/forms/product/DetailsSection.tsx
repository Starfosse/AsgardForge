import Product from "@/services/api/products/types";

interface DetailsSectionProps {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  formData: Product;
  isUploading: boolean;
  product?: Product;
}

export default function DetailsSection({
  handleChange,
  formData,
  isUploading,
}: DetailsSectionProps) {
  return (
    <div className=" mb-4">
      <div className="flex mb-4">
        <div className="flex flex-col w-1/2 pr-4">
          <label
            className="font-bold text-gray-400 pb-1"
            htmlFor={"dimensions"}
          >
            Dimension
          </label>
          <textarea
            className="rounded-sm bg-[#272E48] outline-1 outline outline-gray-500 p-1 px-3 text-gray-400 focus:outline-sky-500"
            id={"dimensions"}
            name={"dimensions"}
            value={formData.dimensions}
            onChange={handleChange}
            rows={3}
            disabled={isUploading}
          />
        </div>
        <div className="flex flex-col w-1/2 pl-4">
          <label className="font-bold text-gray-400 pb-1" htmlFor={"weight"}>
            Poids
          </label>
          <input
            className="rounded-sm bg-[#272E48] outline-1 outline outline-gray-500 p-1 px-3 text-gray-400 focus:outline-sky-500"
            type="number"
            step={0.1}
            min={0}
            id={"weight"}
            name={"weight"}
            value={formData.weight}
            onChange={handleChange}
            disabled={isUploading}
          />
        </div>
      </div>
      <div className="flex flex-col mb-4">
        <label className="font-bold text-gray-400 pb-1" htmlFor={"material"}>
          Matériel
        </label>
        <input
          className="rounded-sm bg-[#272E48] outline-1 outline outline-gray-500 p-1 px-3 text-gray-400 focus:outline-sky-500"
          type="text"
          id={"material"}
          name={"material"}
          value={formData.material}
          onChange={handleChange}
          disabled={isUploading}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label
          className="font-bold text-gray-400 pb-1"
          htmlFor={"specifications"}
        >
          Spécifications
        </label>
        <textarea
          className="rounded-sm bg-[#272E48] outline-1 outline outline-gray-500 p-1 px-3 text-gray-400 focus:outline-sky-500"
          id={"specifications"}
          name={"specifications"}
          value={formData.specifications}
          onChange={handleChange}
          disabled={isUploading}
        />
      </div>
    </div>
  );
}
