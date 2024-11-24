import React from "react";

interface CartItemProps {
  id: string; // id as string for consistency with Cart component
  title: string;
  author: string;
  quantity: number;
  imageUrl: string;
  onRemove: (id: string) => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  author,
  quantity,
  imageUrl,
  onRemove,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="cart-item flex items-center border-b p-4">
      {/* Use the external image URL */}
      <img
        src={imageUrl}
        alt={title}
        className="w-24 h-36 object-cover mr-4"
      />
      <div className="details flex-grow">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-500">by {author}</p>
        <div className="flex items-center">
          {/* Decrease button */}
          <button
            onClick={() => onDecrease(id)}
            className="text-red-500 text-xl p-1 hover:bg-red-100 rounded mr-2"
          >
            -
          </button>
          {/* Quantity display */}
          <p className="text-gray-700 mr-2">Qty: {quantity}</p>
          {/* Increase button */}
          <button
            onClick={() => onIncrease(id)}
            className="text-green-500 text-xl p-1 hover:bg-green-100 rounded"
          >
            +
          </button>
        </div>
      </div>

      {/* Remove Button */}
      <div className="actions flex items-center">
        <button
          onClick={() => onRemove(id)}
          className="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
