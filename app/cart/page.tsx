"use client";

import React, { useEffect, useState } from "react";
import CartItem from "@/components/cartItem/cartItem"; // Ensure this is the correct path
import { useCart } from "@/contexts/CartContext";

// Define the type for a cart item
type CartItemType = {
  bookID: string;
  title: string;
  author: string;
  imageURL: string;
};

const Cart = () => {
  const [items, setItems] = useState<CartItemType[]>([]); // Specify the type for items
  const { cart } = useCart();

  useEffect(() => {
    const fetchCartItems = async () => {
      const fetchedItems: CartItemType[] = []; // Explicitly type the fetched items
      for (const bookID of cart) {
        try {
          const response = await fetch(`/api/book/${bookID}`);
          const data = await response.json();
          fetchedItems.push({
            bookID: bookID,
            title: data.title,
            author: data.author,
            imageURL: data.imageURL,
          });
        } catch (error) {
          console.error(`Error fetching book info for ID ${bookID}:`, error);
        }
      }
      setItems(fetchedItems); // Update state with the fetched items
    };

    if (cart.length > 0) {
      fetchCartItems();
    } else {
      setItems([]); // Clear items when cart is empty
    }
  }, [cart]);

  const handleRemove = (id: string) => {
    const updatedItems = items.filter((item) => item.bookID !== id);
    setItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-4xl mx-auto p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

        {/* Cart Items */}
        {items.length > 0 ? (
          items.map((item) => (
            <CartItem
              key={item.bookID}
              id={item.bookID}
              title={item.title}
              author={item.author}
              imageUrl={item.imageURL}
              onRemove={() => handleRemove(item.bookID)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}

        {/* Checkout and Add More Books Buttons */}
        {items.length > 0 && (
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 text-white"
                style={{ backgroundColor: "#00843D" }}
              >
                Checkout
              </button>
              <button className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-100">
                Add More Books
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
