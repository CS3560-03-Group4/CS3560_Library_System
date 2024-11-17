"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Button } from "@mui/material";

export default function HomePage() {
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout"); // Navigate to the checkout page
  };

  return (
    <Box sx={{ padding: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Home Page
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Check out testing!!
      </Typography>

      {/* Checkout Button with Custom Green Color */}
      <Button
        variant="contained"
        onClick={handleCheckout}
        sx={{
          backgroundColor: "#00843d", // Set to the same green color
          color: "#fff",
          "&:hover": {
            backgroundColor: "#006400", // Darker green for hover effect
          },
        }}
      >
        Go to Checkout
      </Button>
    </Box>
  );
}
