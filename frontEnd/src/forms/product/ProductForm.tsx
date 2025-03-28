import { useEffect, useState } from "react";
import InformationsSection from "./InformationsSection";
import PriceSection from "./PriceSection";
import StockSection from "./StockSection";
import DetailsSection from "./DetailsSection";
import ImageSection from "./ImageSection";
import { productsService } from "@/services/api/products/products.service";
import Product from "@/services/api/products/types";
import { Link, useParams } from "react-router-dom";
import JustAdmin from "@/components/JustAdmin";
import { useAuth } from "@/contexts/AuthContext";

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
    promotion_price: 0,
    stock: 0,
    collection: "",
    alertStock: 0,
    imagesFiles: [],
    specifications: "",
    dimensions: "",
    weight: 0,
    material: "",
    featured: false,
  });
  const [status, setStatus] = useState<Status>({
    submitted: false,
    error: false,
    message: "",
  });
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const { customer } = useAuth();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const product = await productsService.getProduct(parseInt(id));
        setFormData(product);
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: inputValue }));
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
      imagesFiles: prev.imagesFiles
        ? [...prev.imagesFiles, ...files]
        : [...files],
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
    if (customer?.email !== import.meta.env.VITE_ADMIN_EMAIL) {
      setAllowed(true);
      return;
    }
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
        } else if (typeof value === "boolean") {
          formDataToSend.append(key, value.toString());
        }
      }
      console.log("formData", formData);
      console.log("formDataToSend", formDataToSend);
      if (id) {
        productsService.editProduct(parseInt(id), formDataToSend);
      } else {
        productsService.addProduct(formDataToSend);
      }

      setStatus({
        submitted: true,
        error: false,
        message: "Produit ajouté avec succès !",
      });
      previews.forEach((preview) => URL.revokeObjectURL(preview));
      setPreviews([]);
    } catch (error) {
      console.error("Error adding product:", error);
      setStatus((prev) => ({
        ...prev,
        error: true,
        message: "Une erreur est survenue lors de l'ajout du produit",
      }));
    } finally {
      if (!id) {
        setFormData({
          name: "",
          description: "",
          price: 0,
          promotion_price: 0,
          stock: 0,
          collection: "",
          alertStock: 0,
          images: [],
          specifications: "",
          dimensions: "",
          weight: 0,
          material: "",
          featured: false,
        });
      }
      setIsUploading(false);
    }
  };

  if (allowed) {
    return <JustAdmin allowed={allowed} setAllowed={setAllowed} />;
  }

  return (
    <>
      <div>
        <Link
          to="/dashboard/products"
          className="text-gray-400 hover:underline"
        >
          ← Revenir en arrière
        </Link>
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
          {id ? "Modifier le produit" : "Créer le produit"}
        </button>
      </form>
    </>
  );
}
