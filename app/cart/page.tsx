"use client";

import React, { useState } from "react";
import CartItem from "@/components/cartItem/cartItem";

// Mock cart items with initial quantity
const cartItems = [
  {
    id: "1",
    title: "Soul Screamers 1: My Soul to Take",
    author: "Rachel Vincent",
    date: "2024",
    imageUrl: "https://m.media-amazon.com/images/I/51BJSnsM8iL._UF1000,1000_QL80_.jpg",
    quantity: 1,
  },
];

const Cart = () => {
  const [items, setItems] = useState(cartItems);

  // Handle removing an item from the cart
  const handleRemove = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Handle increasing the quantity of an item
  const handleIncrease = (id: string) => {
    setItems(
      items.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Handle decreasing the quantity of an item
  const handleDecrease = (id: string) => {
    setItems(
      items.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Section */}
      <main className="max-w-4xl mx-auto p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

        {/* Cart Items */}
        {items.length > 0 ? (
          items.map(item => (
            <CartItem
              key={item.id}
              id={item.id}
              title={item.title}
              author={item.author}
              imageUrl={item.imageUrl}
              quantity={item.quantity}
              onRemove={() => handleRemove(item.id)}
              onIncrease={() => handleIncrease(item.id)}
              onDecrease={() => handleDecrease(item.id)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}

        {/* Checkout and Add More Books Buttons */}
        {items.length > 0 && (
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-2">
              {/* Updated Checkout button color */}
              <button className="px-4 py-2 text-white" style={{ backgroundColor: "#00843D" }}>
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
