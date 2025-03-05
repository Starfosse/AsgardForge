import { Link } from "react-router-dom";
import DiscountPrice from "../DiscountPrice";
import { WishlistProduct } from "@/services/api/wishlist/types";
import { Heart } from "lucide-react";
import Card from "@/wrapper/Card";

interface RemovedItemsProps {
  wishlistProducts: WishlistProduct[];
  removedItems: number[];
  handleToggleWishlist: (productId: number) => void;
}

export default function RemovedItems({
  wishlistProducts,
  removedItems,
  handleToggleWishlist,
}: RemovedItemsProps) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6 text-stone-800">
        Produits récemment retirés
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistProducts
          .filter((product) => removedItems.includes(product.id))
          .map((product) => (
            <Card
              key={`removed-${product.id}`}
              variant="secondaryHidden"
              className="transition duration-300 opacity-60 hover:opacity-100"
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
                <button
                  onClick={() => handleToggleWishlist(product.id)}
                  className="w-full flex items-center justify-center bg-stone-200 text-stone-800 hover:bg-red-50 hover:text-red-500 px-4 py-2 rounded-lg transition duration-300"
                >
                  <Heart className="w-5 h-5 mr-2 fill-transparent" />
                  Remettre dans la wishlist
                </button>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}
