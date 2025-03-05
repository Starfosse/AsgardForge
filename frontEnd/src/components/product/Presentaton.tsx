import { useCart } from "@/contexts/CartContext";
import { ReviewsCustomers } from "@/pages/client/Product";
import { wishlistService } from "@/services/api";
import Product from "@/services/api/products/types";
import { Axe, Shield, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

interface PresentationProps {
  product: Product;
  isWishlisted: boolean;
  setIsWishlisted: (value: boolean) => void;
  reviews: ReviewsCustomers[];
}

export default function Presentation({
  product,
  isWishlisted,
  setIsWishlisted,
  reviews,
}: PresentationProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
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

  const handleClick = async () => {
    if (!product.id) return;
    if (isWishlisted) {
      await wishlistService.removeFromWishlist(product.id.toString());
      setIsWishlisted(false);
    } else {
      await wishlistService.addToWishlist(product.id.toString());
      setIsWishlisted(true);
    }
  };

  const getAverageRating = () => {
    if (reviews.length === 0) {
      return 0;
    }
    const res =
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    return res;
  };

  const getCssByWishlist = () => {
    return !isWishlisted
      ? "h-7 w-7 pb-2 stroke-black fill-transparent transition-colors duration-300 group-hover:fill-red-500 group-hover:stroke-red-500"
      : "h-7 w-7 pb-2 stroke-red-500 fill-red-500 transition-colors duration-300 group-hover:fill-transparent group-hover:stroke-black";
  };

  return (
    <>
      <div className="flex gap-2 items-center">
        <h1 className="text-4xl font-bold mb-4 text-stone-800">
          {product.name}
        </h1>
        <div className="group cursor-pointer" onClick={handleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={getCssByWishlist()}
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
      </div>
      <div className="flex items-center mb-6">
        <span className="text-3xl font-bold text-amber-700 mr-6">
          {product.price} €
        </span>
        <div className="flex text-yellow-500">
          {[...Array(Math.floor(getAverageRating()))].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
          <span className="text-stone-600 ml-2">({reviews.length} avis)</span>
        </div>
      </div>
      <p className="text-stone-600 mb-6">{product.description}</p>
      <div className="mb-6 space-y-3">
        {details.map((detail, index) => (
          <div key={index} className="flex items-center space-x-3">
            {detail.icon}
            <span className="text-stone-700">{detail.text}</span>
          </div>
        ))}
      </div>
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
        <button
          onClick={() => addToCart(product, quantity)}
          className="flex items-center bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition"
        >
          <ShoppingCart className="mr-2" />
          Ajouter au Panier
        </button>
      </div>
    </>
  );
}
