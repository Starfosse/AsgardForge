import { Heart, ShoppingCart } from "lucide-react";
import DiscountPrice from "../DiscountPrice";
import { Link } from "react-router-dom";
import { WishlistProduct } from "@/services/api/wishlist/types";
import Card from "@/wrapper/Card";

interface WishlistItemsProps {
  wishlistProducts: WishlistProduct[];
  removedItems: number[];
  handleToggleWishlist: (productId: number) => void;
  handleAddToCart: (product: WishlistProduct) => void;
}

export default function WishlistedItems({
  wishlistProducts,
  removedItems,
  handleToggleWishlist,
  handleAddToCart,
}: WishlistItemsProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {wishlistProducts.map((product) => (
        <Card
          key={product.id}
          variant="secondaryHidden"
          className={`transition duration-300 transform ${
            removedItems.includes(product.id) ? "opacity-60" : "hover:scale-105"
          }`}
        >
          <Link
            to={`/${product.collectionName}/${product.collectionId}/${product.name}/${product.id}`}
          >
            <div className="h-64 overflow-hidden">
              <img
                src={product.imagePath}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
          <div className="p-6">
            <Link
              to={`/${product.collectionName}/${product.collectionId}/${product.name}/${product.id}`}
            >
              <h3 className="text-xl font-semibold mb-2 text-stone-800 hover:text-amber-700 transition">
                {product.name}
              </h3>
            </Link>
            <div className="mb-4">
              {product.promotionPrice &&
              product.promotionPrice < product.price ? (
                <DiscountPrice
                  price={product.price}
                  promotionPrice={product.promotionPrice}
                />
              ) : (
                <span className="text-2xl font-bold text-amber-700">
                  {product.price} €
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleToggleWishlist(product.id)}
                className={`flex-1 flex items-center justify-center ${
                  removedItems.includes(product.id)
                    ? "bg-stone-200 text-stone-800 hover:bg-red-50 hover:text-red-500"
                    : "bg-red-50 text-red-500 hover:bg-stone-200 hover:text-stone-800"
                } px-4 py-2 rounded-lg transition duration-300`}
              >
                <Heart
                  className={`w-5 h-5 mr-2 ${
                    removedItems.includes(product.id)
                      ? "fill-transparent"
                      : "fill-current"
                  }`}
                />
                {removedItems.includes(product.id) ? "Remettre" : "Retirer"}
              </button>
              <button
                onClick={() => handleAddToCart(product)}
                className="flex-1 flex items-center justify-center bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition duration-300"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Panier
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
