"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  Divider,
  Grid2,
  CircularProgress,
} from "@mui/material";
import { CartItemType } from "../cart/page";
import { formatDate } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { useUser } from "@/contexts/UserContext";
import { toast } from "react-toastify";

type OrderDetails = {
  totalItems: number;
  orderDate: string;
  dueDate: string;
  status: string;
  orderItems: string[];
};

const ReviewOrderPage = () => {
  const router = useRouter();
  const { cart, setCart } = useCart();
  const { isAuthenticated, role } = useUser();
  const [studentID, setStudentID] = useState<string | null>(null);
  const [orderItems, setOrderItems] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const orderDate = formatDate(new Date().toLocaleDateString("en-CA"));
  // Add 7 days to the current date as the due date*
  const dueDate = formatDate(
    new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleDateString(
      "en-CA"
    )
  );

  // Fetch studentID when the component loads
  useEffect(() => {
    const fetchStudentID = async () => {
      const userID = localStorage.getItem("userID");

      if (!userID) {
        console.error("Failed to fetch student ID. Please try again.");
        return;
      }

      try {
        const response = await fetch(`/api/user/${userID}`);
        if (!response.ok) {
          throw new Error("Failed to fetch student ID");
        }

        const data = await response.json();
        setStudentID(data.studentID); // Assuming `data.studentID` contains the student ID
      } catch (error) {
        console.error("Error fetching student ID:", error);
      }
    };

    fetchStudentID();
  }, []);

  useEffect(() => {
    // Retrieve cart data from localStorage
    const storedItems = localStorage.getItem("checkoutItems");
    if (storedItems) {
      setOrderItems(JSON.parse(storedItems));
    }
  }, []);

  const cleanCartStorage = () => {
    setCart([]);
    localStorage.removeItem("cart");
    localStorage.removeItem("checkoutItems");
    localStorage.removeItem("redirectUrl");
  };

  const handleConfirm = async () => {
    setIsLoading(true);

    if (isAuthenticated && role !== "STUDENT") {
      toast.error(
        "Something went wrong! You must be a student to place an order.",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
      router.push("/");
      cleanCartStorage();
      return;
    }

    if (!isAuthenticated) {
      localStorage.setItem("redirectUrl", "/checkout");
      toast.error("You must be logged in to place an order.", {
        position: "top-center",
        autoClose: 3000,
      });

      router.push("/sign-in"); // Redirect to sign-in page
      return;
    }

    if (!studentID) {
      console.error("Failed to fetch your student ID. Please try again.");
      return;
    }

    try {
      const order: OrderDetails = {
        totalItems: orderItems.length,
        orderDate,
        dueDate,
        status: "ORDERED",
        orderItems: cart,
      };

      const response = await fetch(`/api/orders/${studentID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        toast.error("Failed to confirm order.", {
          position: "top-center",
          autoClose: 3000,
        });
      }

      toast.success("Order placed successfully.", {
        position: "top-center",
        autoClose: 3000,
      });

      cleanCartStorage();
      router.push("/confirm"); // Navigate to the confirmation page
    } catch (error) {
      console.error("Error confirming order:", error);
    } finally {
      setIsLoading(false);
    }
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
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Typography>Order Date:</Typography>
            <Typography>{orderDate}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Typography>Due Date:</Typography>
            <Typography>{dueDate}</Typography>
          </Box>
        </Grid2>
      </Grid2>

      {/* Bottom Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 3, mt: 4 }}>
        <Button
          sx={{
            fontSize: { xs: "0.8rem", md: "1rem" },
            boxShadow: 10,
            borderRadius: 10,
          }}
          className="rounded-xl shadow-lg"
          variant="contained"
          color="success"
          onClick={handleConfirm} // Call handleConfirm when Confirm button is clicked
        >
          {isLoading ? (
            <>
              Placing your order...
              <CircularProgress
                color="inherit"
                size={"1rem"}
                sx={{
                  animation: "spin 1s linear infinite",
                  ml: "0.5rem",
                }}
              />
            </>
          ) : (
            "Place your order"
          )}
        </Button>
        <Button
          sx={{
            fontSize: { xs: "0.75rem", md: "1rem" },
            boxShadow: 10,
            borderRadius: 10,
          }}
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
