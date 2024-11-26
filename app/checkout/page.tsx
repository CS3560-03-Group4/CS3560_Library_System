"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Button, Divider, Grid2 } from "@mui/material";

// Define the type for cart items
type CartItemType = {
  bookID: string;
  title: string;
  author: string;
  imageURL: string;
};

const ReviewOrderPage = () => {
  const router = useRouter();
  const [orderItems, setOrderItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    // Retrieve cart data from localStorage
    const storedItems = localStorage.getItem("checkoutItems");
    if (storedItems) {
      setOrderItems(JSON.parse(storedItems));
    }
  }, []);

  const handleConfirm = () => {
    router.push("/confirm"); // Navigate to the confirmation page
  };

  const handleCancel = () => {
    router.push("/cart"); // Navigate back to the cart page
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Review Order
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Grid2 container spacing={4}>
        {/* Left Section: Ordered Items */}
        <Grid2 size={{ xs: 12, md: 8 }}>
          {orderItems.length > 0 ? (
            orderItems.map((item, index) => (
              <Box key={index} sx={{ display: "flex", mb: 2 }}>
                <Box
                  component="img"
                  src={item.imageURL}
                  alt={item.title}
                  sx={{ width: 100, height: 150, mr: 2, objectFit: "cover" }}
                />
                <Box>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="subtitle2">by {item.author}</Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Typography>No items in your order.</Typography>
          )}
        </Grid2>

        {/* Right Section: Order Summary */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Typography variant="h6">Order Summary</Typography>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Typography>Total Items</Typography>
            <Typography>{orderItems.length}</Typography>
          </Box>
        </Grid2>
      </Grid2>

      {/* Bottom Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 4, mt: 4 }}>
        <Button
          variant="contained"
          color="success"
          onClick={handleConfirm} // Call handleConfirm when Confirm button is clicked
        >
          Place your order
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleCancel} // Call handleCancel when Cancel button is clicked
        >
          Back to Your Cart
        </Button>
      </Box>
    </Box>
  );
};

export default ReviewOrderPage;
