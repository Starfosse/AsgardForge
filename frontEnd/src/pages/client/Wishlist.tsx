import ErrorAuthentificaiton from "@/components/ErrorAuthentification";
import LoadingScreen from "@/components/LoadingScreen";
import EmptyWishlist from "@/components/wishlist/EmptyWishlist";
import RemovedItems from "@/components/wishlist/RemovedItems";
import WishlistedItems from "@/components/wishlist/WishlistedItems";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { wishlistService } from "@/services/api";
import { WishlistProduct } from "@/services/api/wishlist/types";
import { useEffect, useState } from "react";

const Wishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState<WishlistProduct[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [removedItems, setRemovedItems] = useState<number[]>([]);
  const { isAuthenticated } = useAuth();
  const { addToCartFromWishlist } = useCart();

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlistProducts();
    }
  }, [isAuthenticated]);

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

  if (!isAuthenticated) {
    return (
      <ErrorAuthentificaiton
        title="wishlist"
        description="liste de souhaits et gérer vos produits favoris"
      />
    );
  }

  if (loading) {
    return <LoadingScreen title="wishlist" />;
  }

  return (
    <div className="bg-stone-100 py-12 flex-grow">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-stone-800">
          Ma Liste de Souhaits
        </h1>
        {wishlistProducts.length === 0 && removedItems.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <WishlistedItems
            wishlistProducts={wishlistProducts}
            removedItems={removedItems}
            handleToggleWishlist={handleToggleWishlist}
            handleAddToCart={handleAddToCart}
          />
        )}
        {removedItems.length > 0 && (
          <RemovedItems
            wishlistProducts={wishlistProducts}
            removedItems={removedItems}
            handleToggleWishlist={handleToggleWishlist}
          />
        )}
      </div>
    </div>
  );
};

export default Wishlist;
