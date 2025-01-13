import { ProductForm } from "./ProductForm";

interface StockSectionProps {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  formData: ProductForm;
  isUploading: boolean;
}

export default function StockSection({
  handleChange,
  formData,
  isUploading,
}: StockSectionProps) {
  return (
    <div className="flex mb-4">
      <div className="flex flex-col w-1/2 pr-4">
        <label className="font-bold text-gray-400 pb-1" htmlFor={"stock"}>
          Stock
        </label>
        <input
          className="rounded-sm bg-[#272E48] outline-1 outline outline-gray-500 p-1 px-3 text-gray-400 focus:outline-sky-500"
          type="number"
          id={"stock"}
          name={"stock"}
          value={formData.stock}
          onChange={handleChange}
          disabled={isUploading}
        />
      </div>
      <div className="flex flex-col w-1/2 pl-4">
        <label className="font-bold text-gray-400 pb-1" htmlFor={"alertStock"}>
          Stock minimum d'alerte
        </label>
        <input
          className="rounded-sm bg-[#272E48] outline-1 outline outline-gray-500 p-1 px-3 text-gray-400 focus:outline-sky-500"
          type="number"
          id={"alertStock"}
          name={"alertStock"}
          value={formData.alertStock}
          onChange={handleChange}
          disabled={isUploading}
        />
      </div>
    </div>
  );
}
