import React, { createContext, useContext, useEffect, useState } from "react";

// Define the CartContext
const CartContext = createContext<{
  cart: string[];
  setCart: React.Dispatch<React.SetStateAction<string[]>>;
} | null>(null);

// CartProvider to wrap your app and provide the cart state
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<string[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
