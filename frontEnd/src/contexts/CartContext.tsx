import { ProductWithImages } from "@/pages/client/Product";
import { createContext, useContext, useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  promotionPrice?: number;
  quantity: number;
  image: string;
}

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: ProductWithImages, quantity: number) => void;
  substractFromCart: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const addToCart = (item: ProductWithImages, quantity: number) => {
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
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
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
  };
  const clearCart = () => {
    setCart([]);
  };
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, substractFromCart }}
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
