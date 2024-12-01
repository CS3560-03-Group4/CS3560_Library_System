"use client";

import BookCard, { BookProps } from "@/components/bookcard/bookcard";
import OrderInfo from "@/components/order/OrderInfo";
import { formatDate } from "@/lib/utils";
import {
  Box,
  CircularProgress,
  Divider,
  Grid2,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function Order({ params }: { params: { orderID: string } }) {
  const { orderID } = params;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bookItems, setBookItems] = useState<BookProps[]>([]);
  const [orderInfo, setOrderInfo] = useState({
    totalItems: "",
    orderDate: "",
    dueDate: "",
    status: "",
  });
  const [userID, setUserID] = useState<string>("");

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    if (userID) {
      setUserID(userID);
    }
    const fetchOrderDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/order/${orderID}`);
        const order = await response.json();
        const { orderItems } = order;
        // console.log(orderItems[0]);
        if (order) {
          setOrderInfo({
            totalItems: orderItems[0].totalItems,
            orderDate: formatDate(orderItems[0].orderDate),
            dueDate: formatDate(orderItems[0].dueDate),
            status: orderItems[0].status,
          });
        } else {
          console.error("Order ID not found");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setIsLoading(false); // Set loading to false once the fetch is complete
      }
    };

    fetchOrderDetails();
  }, []);

  useEffect(() => {
    const fetchOrderItems = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/order/${orderID}`);
        const order = await response.json();
        const { orderItems } = order;
        // console.log(orderItems);
        if (orderItems.length > 0) {
          setBookItems(orderItems);
        } else {
          console.error("Order ID not found");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setIsLoading(false); // Set loading to false once the fetch is complete
      }
    };

    fetchOrderItems();
  }, []);
  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "100vh",
          }}
        >
          <CircularProgress color="success" />
          <Typography sx={{ mt: 2 }}>Fetching order details...</Typography>
        </Box>
      ) : (
        <Grid2 container padding={2}>
          {/* Left Banner */}
          <Grid2 size={{ xs: 12, md: 2 }}>
            <h1 className="mt-4 mb-5 text-4xl font-bold">Your Order</h1>
            <OrderInfo
              orderID={orderID}
              userID={userID}
              totalItems={orderInfo.totalItems}
              orderDate={orderInfo.orderDate}
              dueDate={orderInfo.dueDate}
              status={orderInfo.status}
            />
          </Grid2>
          <Grid2>
            <Divider
              orientation="vertical"
              variant="middle"
              sx={{ margin: "0 2rem 0 0" }}
              className="min-h-svh hidden lg:block"
            />
          </Grid2>

          {/* Right Area with Form */}
          <Grid2 size={{ xs: 12, md: 9 }}>
            <h1 className="mt-4 mb-5 text-4xl font-bold">Order Items</h1>
            <Box
              sx={{
                display: "flex",
                overflowX: "auto",
                gap: "1rem", // Spacing between cards
                padding: "0.8rem",
                scrollbarWidth: "none", // Firefox
                "&::-webkit-scrollbar": {
                  display: "none", // Chrome/Safari
                },
              }}
            >
              {bookItems.map((book, index) => (
                <BookCard
                  key={index}
                  bookID={book.bookID}
                  title={book.title}
                  author={book.author}
                  datePublished={formatDate(book.datePublished)}
                  imageURL={book.imageURL}
                />
              ))}
            </Box>
          </Grid2>
        </Grid2>
      )}
    </>
  );
}
