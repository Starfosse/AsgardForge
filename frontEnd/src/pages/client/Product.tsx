import { productsService } from "@/services/api";
import Product from "@/services/api/products/types";
import { Axe, Shield, ShoppingCart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Images {
  id: number;
  product_id: number;
  image_order: number;
  image_path: string;
}

export interface ProductWithImages {
  id?: number;
  name: string;
  description: string;
  price: number;
  promotionPrice: number;
  stock: number;
  category: string;
  alertStock: number;
  details: string;
  specifications: string;
  dimensions: string;
  weight: number;
  material: string;
  images: Images[];
}

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductWithImages | null>(null);
  const fetchProduct = async () => {
    if (!productId) return;
    const response = await productsService.getProduct(parseInt(productId));
    setProduct(response);
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const details = [
    {
      icon: <Axe className="w-6 h-6 text-amber-700" />,
      text: "Forgée à la main par nos artisans",
    },
    {
      icon: <Shield className="w-6 h-6 text-gray-600" />,
      text: "Matériaux de haute qualité",
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      text: "Authentique reproduction historique",
    },
  ];
  return (
    <div className="bg-stone-100 min-h-screen py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
        {/* Galerie Images */}
        <div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
            <img
              src={product?.images[selectedImage]?.image_path}
              alt={product?.name}
              className="w-full h-[500px] object-cover"
            />
          </div>
          <div className="flex space-x-4">
            {product?.images.map((img, index) => (
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

        {/* Détails Produit */}
        <div>
          <h1 className="text-4xl font-bold mb-4 text-stone-800">
            {product?.name}
          </h1>

          <div className="flex items-center mb-6">
            <span className="text-3xl font-bold text-amber-700 mr-6">
              {product?.price} €
            </span>
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="text-stone-600 ml-2">(5 avis)</span>
            </div>
          </div>

          <p className="text-stone-600 mb-6">{product?.description}</p>

          {/* Points Clés */}
          <div className="mb-6 space-y-3">
            {details.map((detail, index) => (
              <div key={index} className="flex items-center space-x-3">
                {detail.icon}
                <span className="text-stone-700">{detail.text}</span>
              </div>
            ))}
          </div>

          {/* Quantité et Panier */}
          <div className="flex items-center space-x-6 mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-stone-200 px-3 py-1 rounded"
              >
                -
              </button>
              <span className="text-xl">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-stone-200 px-3 py-1 rounded"
              >
                +
              </button>
            </div>
            <button className="flex items-center bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition">
              <ShoppingCart className="mr-2" />
              Ajouter au Panier
            </button>
          </div>

          {/* Spécifications */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold mb-4 text-stone-800">
              Spécifications
            </h3>

            {/* {product.specifications.map((spec, index) => (
                <div key={index} className="border-b pb-2">
                   <span className="text-stone-600">Dimensions</span>
                  <div className="font-semibold text-stone-800">
                    {spec.value}
                  </div>
                </div>
              ))} */}
            {
              <div className="grid grid-cols-2 gap-4">
                <div className="border-b pb-2">
                  <span className="text-stone-600">Dimensions</span>
                  <div className="font-semibold text-stone-800">
                    {product?.dimensions}
                  </div>
                </div>
                <div className="border-b pb-2">
                  <span className="text-stone-600">Poids</span>
                  <div className="font-semibold text-stone-800">
                    {product?.weight}
                  </div>
                </div>
                <div className="border-b pb-2">
                  <span className="text-stone-600">Matériaux</span>
                  <div className="font-semibold text-stone-800">
                    {product?.material}
                  </div>
                </div>
                <div className="border-b pb-2">
                  <span className="text-stone-600">Origine</span>
                  <div className="font-semibold text-stone-800">
                    {product?.specifications}
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
