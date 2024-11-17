"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Button, Divider, Grid2 } from "@mui/material";

const ReviewOrderPage = () => {
  const router = useRouter();

  // Example order data
  const orderItems = [
    {
      title: "Soul Screamers 1: My Soul to Take",
      author: "Rachel Vincent",
      qty: 1,
      image:
        "https://m.media-amazon.com/images/I/51BJSnsM8iL._UF1000,1000_QL80_.jpg",
    },
    {
      title: "Soul Screamers 2: My Soul to Save",
      author: "Rachel Vincent",
      qty: 1,
      image:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1255722532i/6763961.jpg",
    },
  ];

  // Function to handle confirm button click
  const handleConfirm = () => {
    router.push("/confirm"); // Navigate to the confirmation page
  };

  // Function to handle cancel button click
  const handleCancel = () => {
    router.push("/"); // Navigate back to the main page
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom>
        Review Order
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Grid2 container spacing={4}>
        {/* Left Section: Ordered Items */}
        <Grid2 size={{ xs: 12, md: 8 }}>
          {orderItems.map((item, index) => (
            <Box key={index} sx={{ display: "flex", mb: 2 }}>
              <Box
                component="img"
                src={item.image}
                alt={item.title}
                sx={{ width: 100, height: 150, mr: 2, objectFit: "cover" }}
              />
              <Box>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="subtitle2">by {item.author}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Qty: {item.qty}
                </Typography>
              </Box>
            </Box>
          ))}
        </Grid2>

        {/* Right Section: Order Summary */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Typography variant="h6">Order Summary</Typography>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Typography>Order No.</Typography>
            <Typography>0001</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography>Order Date</Typography>
            <Typography>11/12/2024</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography>Email</Typography>
            <Typography>example@cpp.edu</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography>Total</Typography>
            <Typography>$0.00</Typography>
          </Box>
        </Grid2>
      </Grid2>

      {/* Bottom Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 4, mt: 4 }}>
        <Button
          variant="contained"
          color="success"
          // sx={{ mx: 2, width: 150 }}
          onClick={handleConfirm} // Call handleConfirm when Confirm button is clicked
        >
          Place your order
        </Button>
        <Button
          variant="contained"
          color="inherit"
          // sx={{ mx: 2, width: 150 }}
          onClick={handleCancel} // Call handleCancel when Cancel button is clicked
        >
          Back to Your Cart
        </Button>
      </Box>
    </Box>
  );
};

export default ReviewOrderPage;
