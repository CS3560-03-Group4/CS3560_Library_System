"use client";

import { formatDate } from "@/lib/utils";
import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export default function OrderInfo({ orderID }: { orderID: string }) {
  const [orderInfo, setOrderInfo] = useState({
    totalItems: "",
    orderDate: "",
    dueDate: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
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

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            minHeight: "100vh",
          }}
        >
          <CircularProgress color="success" />
        </Box>
      ) : (
        <div className="flex flex-col gap-4 mb-4">
          <div>
            <h3 className="font-semibold text-xl">Order ID</h3>
            <p>{orderID}</p>
          </div>
          <div>
            <h3 className="font-semibold text-xl">Order Date</h3>
            <p>{orderInfo.orderDate}</p>
          </div>
          <div>
            <h3 className="font-semibold text-xl">Due Date</h3>
            <p>{orderInfo.dueDate}</p>
          </div>
          <div>
            <h3 className="font-semibold text-xl">Total Item(s)</h3>
            <p>{orderInfo.totalItems}</p>
          </div>
          <div>
            <h3 className="font-semibold text-xl">Status</h3>
            <div
              className={`mt-2 ${
                orderInfo.status === "ORDERED" ? "bg-[#00843d] " : ""
              }  ${orderInfo.status === "RECEIVED" ? "bg-[#29d2e4] " : ""}  ${
                orderInfo.status === "READY" ? "bg-[#2f57da] " : ""
              }  ${orderInfo.status === "BORROWED" ? "bg-[#3363e9] " : ""}   ${
                orderInfo.status === "OVERDUE" ? "bg-[#FFC107] " : ""
              }  ${
                orderInfo.status === "CANCELED" ? "bg-[#808080] " : ""
              } inline-block text-white rounded-xl`}
            >
              <p className="p-2 font-bold">{orderInfo.status}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
