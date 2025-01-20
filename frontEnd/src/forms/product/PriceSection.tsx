import Product from "@/services/api/products/types";

interface PriceSectionProps {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  formData: Product;
  isUploading: boolean;
  product?: Product;
}

export default function PriceSection({
  handleChange,
  formData,
  isUploading,
}: PriceSectionProps) {
  return (
    <div className="flex mb-4">
      <div className="flex flex-col w-1/2 pr-4">
        <label className="font-bold text-gray-400 pb-1" htmlFor={"price"}>
          Prix
        </label>
        <input
          className="rounded-sm bg-[#272E48] outline-1 outline outline-gray-500 p-1 px-3 text-gray-400 focus:outline-sky-500"
          type="number"
          id={"price"}
          name={"price"}
          value={formData.price}
          onChange={handleChange}
          disabled={isUploading}
        />
      </div>
      <div className="flex flex-col w-1/2 pl-4">
        <label
          className="font-bold text-gray-400 pb-1"
          htmlFor={"promotionPrice"}
        >
          Prix promotionnel
        </label>
        <input
          className="rounded-sm bg-[#272E48] outline-1 outline outline-gray-500 p-1 px-3 text-gray-400 focus:outline-sky-500"
          type="number"
          id={"promotionPrice"}
          name={"promotionPrice"}
          value={formData.promotionPrice}
          onChange={handleChange}
          disabled={isUploading}
        />
      </div>
    </div>
  );
}
