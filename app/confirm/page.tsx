"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Divider, Button, Stepper, Step, StepLabel } from "@mui/material";

const ConfirmationPage = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/"); // Navigate back to the home page
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 600, margin: "0 auto", textAlign: "left" }}>
      {/* Page Title */}
      <Typography variant="h4" gutterBottom>
        Confirmation
      </Typography>
      <Divider sx={{ my: 2 }} />

      {/* Confirmation Message */}
      <Typography variant="body1" sx={{ mb: 2 }}>
        Your order was placed successfully
      </Typography>
      <Typography variant="body2" sx={{ mb: 4 }}>
        A confirmation was sent to example@cpp.edu
      </Typography>

      {/* Stepper for Order Status */}
      <Stepper activeStep={0} alternativeLabel sx={{ maxWidth: 400, mb: 4 }}>
        <Step>
          <StepLabel>Order placed</StepLabel>
        </Step>
        <Step>
          <StepLabel>Prepare</StepLabel>
        </Step>
        <Step>
          <StepLabel>Ready to pick up</StepLabel>
        </Step>
      </Stepper>

      {/* Fixed Go Back Button Positioned Above the Bottom */}
      <Box
        sx={{
          position: "fixed",
          bottom: 145, // Adjust this as needed to avoid overlap
          right: 16,
        }}
      >
        <Button
          variant="contained"
          onClick={handleGoHome}
          sx={{
            backgroundColor: "#00843d", // Replace this with the exact color code if different
            color: "#fff",
            "&:hover": {
              backgroundColor: "#006400", // Slightly darker green for hover effect
            },
          }}
        >
          Go back to home page
        </Button>
      </Box>
    </Box>
  );
};

export default ConfirmationPage;
