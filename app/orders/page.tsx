"use client";

import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Step,
  StepLabel,
  Stepper,
  Divider,
  styled,
  StepConnector as MuiStepConnector,
} from "@mui/material";

// Mock Data
const orders = [
  {
    orderDate: "11/15/2024",
    title: "Soul Screamers 2: My Soul to Save",
    author: "Rachel Vincent",
    image:
      "https://m.media-amazon.com/images/I/51BJSnsM8iL._UF1000,1000_QL80_.jpg",
    publicationDate: "01/01/2010",
    currentStep: 2,
  },
  {
    orderDate: "11/01/2024",
    title: "Soul Screamers 1: My Soul to Take",
    author: "Rachel Vincent",
    image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1255722532i/6763961.jpg",
    publicationDate: "01/01/2009",
    currentStep: 4,
  },
];

// Steps for the Stepper
const steps = ["Order placed", "Prepare", "Ready to pick up", "Picked up"];

// Custom Step Connector
const CustomStepConnector = styled(MuiStepConnector)(({ theme }) => ({
  [`& .MuiStepConnector-line`]: {
    borderColor: "#ddd",
    borderWidth: 2, // Thickness of the line
  },
}));

// Custom Step Icon
const CustomStepIcon = styled("div")<{ isActive: boolean }>(({ isActive }) => ({
  width: 24, // Increased size
  height: 24,
  borderRadius: "50%",
  backgroundColor: isActive ? "#00843D" : "#ddd", // Highlight current step
  margin: "0 auto",
}));

export default function MyOrders() {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Orders
      </Typography>

      {orders.map((order, index) => (
        <Box
          key={index}
          sx={{
            marginBottom: 4,
            padding: 2,
            backgroundColor: "#f9f9f9",
            borderRadius: 2,
          }}
        >
          <Typography variant="subtitle1" gutterBottom>
            Order Date: {order.orderDate}
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            {/* Book Image */}
            <Card sx={{ width: 120, height: 160, overflow: "hidden" }}>
              <img
                src={order.image}
                alt={order.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Card>

            {/* Book Info and Stepper */}
            <Box sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6">{order.title}</Typography>
                <Typography variant="subtitle2">by {order.author}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Published: {order.publicationDate}
                </Typography>
              </CardContent>

              {/* Stepper */}
              <Stepper
                activeStep={order.currentStep - 1}
                alternativeLabel
                connector={<CustomStepConnector />}
                sx={{ marginTop: 2 }}
              >
                {steps.map((label, stepIndex) => (
                  <Step key={stepIndex}>
                    <StepLabel
                      StepIconComponent={() => (
                        <CustomStepIcon
                          isActive={stepIndex === order.currentStep - 1}
                        />
                      )}
                    >
                      <Typography variant="caption">{label}</Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            {/* Cancel Order Button */}
            <Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#00843D",
                  "&:hover": {
                    backgroundColor: "#005A2E",
                  },
                }}
              >
                Cancel Order
              </Button>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
