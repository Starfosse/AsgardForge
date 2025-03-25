import { Images } from "@/services/api/products/types";
import Card from "@/wrapper/Card";

interface ImagesProps {
  images: Images[];
  selectedImage: number;
  setSelectedImage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Gallery({
  images,
  selectedImage,
  setSelectedImage,
}: ImagesProps) {
  return (
    <div>
      <Card variant="secondaryHidden" className="mb-6">
        <img
          src={images[selectedImage].image_path}
          alt={`Vue ${selectedImage + 1}`}
          className="w-full h-full object-contain"
        />
      </Card>
      <div className="flex space-x-4">
        {images!.map((img, index) => (
          <img
            key={index}
            src={img.image_path}
            alt={`Vue ${index + 1}`}
            className={`w-24 h-24 object-cover rounded-lg cursor-pointer transition duration-300 ${
              selectedImage === index
                ? "border-4 border-amber-700 opacity-100"
                : "opacity-60 hover:opacity-100"
            }`}
            onClick={() => setSelectedImage(index)}
          />
        ))}
      </div>
    </div>
  );
}
