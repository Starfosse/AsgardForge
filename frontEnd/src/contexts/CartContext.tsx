import Product from "@/services/api/products/types";
import { WishlistProduct } from "@/services/api/wishlist/types";
import { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  promotionPrice?: number;
  quantity: number;
  image: string;
}

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Product, quantity: number) => void;
  addToCartFromWishlist: (item: WishlistProduct) => void;
  substractFromCart: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  calculateTotal: () => string;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        return Array.isArray(parsedCart) ? parsedCart : [];
      } catch (e) {
        console.error("Error parsing cart from localStorage:", e);
        localStorage.removeItem("cart");
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        return [
          ...prevCart,
          {
            id: item.id!,
            name: item.name,
            price: Number(item.price),
            promotionPrice: item.promotionPrice
              ? Number(item.promotionPrice)
              : undefined,
            quantity: quantity,
            image: item.images?.[0]?.image_path || "",
          },
        ];
      }
    });
  };

  const addToCartFromWishlist = (item: WishlistProduct) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [
          ...prevCart,
          {
            id: item.id,
            name: item.name,
            price: Number(item.price),
            promotionPrice: item.promotionPrice
              ? Number(item.promotionPrice)
              : undefined,
            quantity: 1,
            image: item.imagePath,
          },
        ];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const substractFromCart = (id: number, quantity: number) => {
    setCart((prevCart) => {
      const item = prevCart.find((i) => i.id === id);
      if (!item) return prevCart;

      if (item.quantity - quantity <= 0) {
        return prevCart.filter((i) => i.id !== id);
      } else {
        return prevCart.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - quantity } : i
        );
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => {
        const price = item.promotionPrice ?? item.price;
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addToCartFromWishlist,
        removeFromCart,
        clearCart,
        substractFromCart,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
