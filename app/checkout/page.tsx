"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Button, Divider, Grid } from "@mui/material";

const ReviewOrderPage = () => {
  const router = useRouter();

  // Example order data
  const orderItems = [
    { title: "Soul Screamers 1: My Soul to Take", author: "Rachel Vincent", qty: 1, image: "/images/example1.jpg" },
    { title: "Soul Screamers 2: My Soul to Save", author: "Rachel Vincent", qty: 1, image: "/images/example2.jpg" },
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

      <Grid container spacing={4}>
        {/* Left Section: Ordered Items */}
        <Grid item xs={12} md={8}>
          {orderItems.map((item, index) => (
            <Box key={index} sx={{ display: "flex", mb: 2 }}>
              <Box
                component="img"
                src={item.image}
                alt={item.title}
                sx={{ width: 100, height: 150, mr: 2 }}
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
        </Grid>

        {/* Right Section: Order Summary */}
        <Grid item xs={12} md={4}>
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
        </Grid>
      </Grid>

      {/* Bottom Buttons */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="contained"
          color="success"
          sx={{ mx: 2, width: 150 }}
          onClick={handleConfirm} // Call handleConfirm when Confirm button is clicked
        >
          Confirm
        </Button>
        <Button
          variant="contained"
          color="inherit"
          sx={{ mx: 2, width: 150 }}
          onClick={handleCancel} // Call handleCancel when Cancel button is clicked
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ReviewOrderPage;
