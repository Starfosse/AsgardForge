import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { wishlistService } from "@/services/api";
import { Heart, ShoppingCart, AlertCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { WishlistProduct } from "@/services/api/wishlist/types";

const Wishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState<WishlistProduct[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [removedItems, setRemovedItems] = useState<number[]>([]);
  const { isAuthenticated, login } = useAuth();
  const { addToCartFromWishlist } = useCart();
  const fetchWishlistProducts = async () => {
    try {
      setLoading(true);
      const products = await wishlistService.getWishlistProducts();
      setWishlistProducts(products);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des produits wishlistés:",
        error
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlistProducts();
    }
  }, [isAuthenticated]);

  const handleToggleWishlist = async (productId: number) => {
    try {
      if (removedItems.includes(productId)) {
        await wishlistService.addToWishlist(productId.toString());
        setRemovedItems(removedItems.filter((id) => id !== productId));
      } else {
        await wishlistService.removeFromWishlist(productId.toString());
        setRemovedItems([...removedItems, productId]);
      }
    } catch (error) {
      console.error("Erreur lors de la modification de la wishlist:", error);
    }
  };
  const handleAddToCart = (product: WishlistProduct) => {
    addToCartFromWishlist(product);
  };
  const calculateDiscount = (price: number, promoPrice: number | null) => {
    if (!promoPrice || promoPrice >= price) return null;
    return Math.round(((price - promoPrice) / price) * 100);
  };
  if (!isAuthenticated) {
    return (
      <div className="bg-stone-100 min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg mx-auto">
            <AlertCircle className="w-16 h-16 text-amber-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4 text-stone-800">
              Connectez-vous pour voir votre wishlist
            </h1>
            <p className="text-stone-600 mb-8">
              Vous devez être connecté pour accéder à votre liste de souhaits et
              gérer vos produits favoris.
            </p>
            <button
              onClick={login}
              className="bg-amber-700 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="bg-stone-100 min-h-screen flex items-center justify-center">
        <div className="text-xl text-amber-700">
          Chargement de votre wishlist...
        </div>
      </div>
    );
  }
  return (
    <div className="bg-stone-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-stone-800">
          Ma Liste de Souhaits
        </h1>
        {wishlistProducts.length === 0 && removedItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Heart className="w-16 h-16 text-stone-400 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold mb-4 text-stone-800">
              Votre liste de souhaits est vide
            </h2>
            <p className="text-stone-600 mb-8">
              Naviguez dans notre catalogue et ajoutez vos articles préférés à
              votre liste de souhaits.
            </p>
            <Link
              to="/"
              className="bg-amber-700 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 inline-block"
            >
              Découvrir nos produits
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 transform ${
                  removedItems.includes(product.id)
                    ? "opacity-60"
                    : "hover:scale-105"
                }`}
              >
                <Link
                  to={`/${product.collectionName}/${product.collectionId}/${product.name}/${product.id}`}
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={product.imagePath || "/api/placeholder/400/300"}
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
                      <div>
                        <span className="text-2xl font-bold text-amber-700">
                          {product.promotionPrice} €
                        </span>
                        <span className="ml-2 text-stone-500 line-through">
                          {product.price} €
                        </span>
                        <span className="ml-2 bg-red-100 text-red-700 text-sm px-2 py-1 rounded">
                          -
                          {calculateDiscount(
                            product.price,
                            product.promotionPrice
                          )}
                          %
                        </span>
                      </div>
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
                      {removedItems.includes(product.id)
                        ? "Remettre"
                        : "Retirer"}
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
              </div>
            ))}
          </div>
        )}
        {removedItems.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-stone-800">
              Produits récemment retirés
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistProducts
                .filter((product) => removedItems.includes(product.id))
                .map((product) => (
                  <div
                    key={`removed-${product.id}`}
                    className="bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 opacity-60 hover:opacity-100"
                  >
                    <Link
                      to={`/${product.collectionName}/${product.collectionId}/${product.name}/${product.id}`}
                    >
                      <div className="h-64 overflow-hidden">
                        <img
                          src={product.imagePath || "/api/placeholder/400/300"}
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
                          <div>
                            <span className="text-2xl font-bold text-amber-700">
                              {product.promotionPrice} €
                            </span>
                            <span className="ml-2 text-stone-500 line-through">
                              {product.price} €
                            </span>
                          </div>
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
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
