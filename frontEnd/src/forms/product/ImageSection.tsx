import Product from "@/services/api/products/types";

interface ImageSectionProps {
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
  previews: string[];
  removeImage: (index: number) => void;
  product?: Product;
}

export default function ImageSection({
  handleImageChange,
  isUploading,
  previews,
  removeImage,
}: ImageSectionProps) {
  return (
    <div className="mb-4 flex flex-col">
      <label className="font-bold text-gray-400 pb-1" htmlFor={"image"}>
        Images (Max: 5MB par image, formats: JPG, PNG, GIF)
      </label>
      <button
        type="button"
        onClick={() => document.getElementById("images")?.click()}
        disabled={isUploading}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      >
        Ajouter des images
      </button>
      <input
        className="hidden rounded-sm bg-[#272E48] outline-1 outline outline-gray-500 p-1 px-3 text-gray-400 focus:outline-sky-500"
        type="file"
        accept="image/*"
        id={"images"}
        name={"image"}
        disabled={isUploading}
        onChange={handleImageChange}
      />
      {previews.length > 0 && (
        <div className="flex gap-4 mt-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <img
                src={preview}
                alt={`aperçu ${index + 1}`}
                className="w-60 h-60 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                disabled={isUploading}
                className="absolute top-1 right-2 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full 
                             opacity-0 group-hover:opacity-100 transition-opacity
                             disabled:opacity-50 hover:bg-red-600"
              >
                <span className="text-sm font-bold">X</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
