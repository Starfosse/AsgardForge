import Product from "@/services/api/products/types";
import { WishlistProduct } from "@/services/api/wishlist/types";
import { createContext, useContext, useState } from "react";

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
  const [cart, setCart] = useState<CartItem[]>([]);
  const addToCart = (item: Product, quantity: number) => {
    const existingItem = cart.find((i) => i.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        )
      );
    } else {
      setCart([
        ...cart,
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
      ]);
    }
    if (localStorage.getItem("cart") === null) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
      existingCart.push(cart);
      localStorage.setItem("cart", JSON.stringify(existingCart));
    }
  };
  const addToCartFromWishlist = (item: WishlistProduct) => {
    const existingItem = cart.find((i) => i.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: item.id,
          name: item.name,
          price: item.promotionPrice
            ? Number(item.promotionPrice)
            : Number(item.price),
          promotionPrice: item.promotionPrice
            ? Number(item.promotionPrice)
            : undefined,
          quantity: 1,
          image: item.imagePath,
        },
      ]);
    }
    if (localStorage.getItem("cart") === null) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
      existingCart.push(cart);
      localStorage.setItem("cart", JSON.stringify(existingCart));
    }
  };
  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
    if (!cart) {
      localStorage.removeItem("cart");
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };
  const substractFromCart = (id: number, quantity: number) => {
    if (cart.find((i) => i.id === id)!.quantity - quantity === 0) {
      removeFromCart(id);
    } else {
      setCart(
        cart.map((i) =>
          i.id === id
            ? { ...i, quantity: Math.max(0, i.quantity - quantity) }
            : i
        )
      );
    }
    if (!cart) {
      localStorage.removeItem("cart");
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };
  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
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
