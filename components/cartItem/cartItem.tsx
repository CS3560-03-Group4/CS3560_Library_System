import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React from "react";

interface CartItemProps {
  id: string; // id as string for consistency with Cart component
  title: string;
  author: string;
  imageUrl: string;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  author,
  imageUrl,
  onRemove,
}) => {
  return (
    <div className="cart-item flex items-center border-b p-4">
      {/* Use the external image URL */}
      <img src={imageUrl} alt={title} className="w-24 h-36 object-cover mr-4" />
      <div className="details flex-grow">
        <h2 className="text-md sm:text-xl font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">by {author}</p>
      </div>

      {/* Remove Button */}
      <div className="actions flex items-center">
        <Button
          onClick={() => onRemove(id)}
          sx={{
            color: "red",
            borderColor: "red",
          }}
          className="text-red-500 hover:text-red-700"
        >
          <IconButton
            color="inherit"
            sx={{
              ":hover": {
                backgroundColor: "red",
                opacity: 0.8,
                color: "white",
                borderRadius: "50%",
              },
            }}
          >
            <Delete />
          </IconButton>
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
