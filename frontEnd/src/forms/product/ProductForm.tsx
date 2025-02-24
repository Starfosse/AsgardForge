import { useEffect, useState } from "react";
import InformationsSection from "./InformationsSection";
import PriceSection from "./PriceSection";
import StockSection from "./StockSection";
import DetailsSection from "./DetailsSection";
import ImageSection from "./ImageSection";
import { productsService } from "@/services/api";
import Product from "@/services/api/products/types";
import { useParams } from "react-router-dom";

interface Status {
  submitted: boolean;
  error: boolean;
  message: string;
}

export default function ProductForm() {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    promotionPrice: 0,
    stock: 0,
    category: "",
    alertStock: 0,
    imagesFiles: [],
    details: "",
    specifications: "",
    dimensions: "",
    weight: 0,
    material: "",
  });
  useEffect(() => {
    if (id) {
      productsService.getProduct(parseInt(id)).then((product) => {
        setFormData(product);
      });
    }
  }, [id]);
  const [status, setStatus] = useState<Status>({
    submitted: false,
    error: false,
    message: "",
  });
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        setStatus((prev) => ({
          ...prev,
          error: true,
          message: "L'image est trop lourde",
        }));
        return;
      }
      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
        setStatus((prev) => ({
          ...prev,
          error: true,
          message: "Le format de l'image n'est pas supporté",
        }));
        return;
      }
    }
    setStatus((prev) => ({ ...prev, error: false, message: "" }));
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
    setFormData((prev) => ({
      ...prev,
      imagesFiles: [...prev.imagesFiles!, ...files],
    }));
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      imagesFiles: prev.imagesFiles!.filter((_, i) => i !== index),
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      setStatus((prev) => ({ ...prev, error: false, message: "" }));
      const formDataToSend = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        if (key === "imagesFiles") {
          formData.imagesFiles!.forEach((image) => {
            formDataToSend.append("images", image);
          });
        } else if (typeof value === "number") {
          formDataToSend.append(key, value.toString());
        } else if (typeof value === "string") {
          formDataToSend.append(key, value);
        }
      }
      id
        ? productsService.editProduct(parseInt(id), formDataToSend)
        : productsService.addProduct(formDataToSend);

      setStatus({
        submitted: true,
        error: false,
        message: "Produit ajouté avec succès !",
      });
    } catch (error) {
      setStatus((prev) => ({
        ...prev,
        error: true,
        message: "Une erreur est survenue lors de l'ajout du produit",
      }));
    } finally {
      id
        ? null
        : setFormData({
            name: "",
            description: "",
            price: 0,
            promotionPrice: 0,
            stock: 0,
            category: "",
            alertStock: 0,
            images: [],
            details: "",
            specifications: "",
            dimensions: "",
            weight: 0,
            material: "",
          });
      setIsUploading(false);
    }
  };
  return (
    <>
      <div>
        <button
          className="text-gray-400 hover:underline"
          onClick={() => history.back()}
        >
          ← Revenir en arrière
        </button>
      </div>
      <h1 className="text-2xl text-gray-400 mb-6 text-center">
        {id ? (
          <span>Modifier un produit</span>
        ) : (
          <span>Ajouter un produit</span>
        )}
      </h1>
      <form onSubmit={handleSubmit}>
        <InformationsSection
          handleChange={handleChange}
          formData={formData}
          isUploading={isUploading}
          setFormData={setFormData}
        />
        <PriceSection
          handleChange={handleChange}
          formData={formData}
          isUploading={isUploading}
        />
        <StockSection
          handleChange={handleChange}
          formData={formData}
          isUploading={isUploading}
        />
        <DetailsSection
          handleChange={handleChange}
          formData={formData}
          isUploading={isUploading}
        />
        <ImageSection
          handleImageChange={handleImageChange}
          isUploading={isUploading}
          previews={previews}
          removeImage={removeImage}
        />
        {status.error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            {status.message}
          </div>
        )}

        {status.submitted && !status.error && (
          <div className="p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
            {status.message}
          </div>
        )}
        <button
          type="submit"
          disabled={isUploading}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 
                   disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isUploading ? "Création en cours..." : "Créer le produit"}
        </button>
      </form>
    </>
  );
}
