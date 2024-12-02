"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import UpdateOrderModal from "@/components/update_order_form/updateOrderModal";
import { formatDate } from "@/lib/utils";

interface Order {
  orderId: string;
  studentId: string;
  bookTitles: string;
  borrowDate: string;
  dueDate: string;
  status: string;
}

const OrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllOrdersInfo = async () => {
      try {
        const response = await fetch("/api/getAllOrdersInfo");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();

        // Map and transform data
        const transformedOrders = data.map((item: any) => ({
          orderId: item.OrderID,
          studentId: item.StudentID,
          bookTitles: Array.isArray(item["BookItem(s)"])
            ? item["BookItem(s)"].join(", ")
            : item["BookItem(s)"],
          borrowDate: item["Order Date"],
          dueDate: item["Due Date"],
          status: item.Status,
        }));

        setOrders(transformedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchAllOrdersInfo();
  }, []);

  // Filter orders based on search term and selected status
  const filteredOrders = orders.filter(
    (order) =>
      order.studentId.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedStatus
        ? order.status.toUpperCase() === selectedStatus.toUpperCase()
        : true)
  );

  const handleUpdateOrder = async (updatedOrder: Order) => {
    try {
      updatedOrder.status = updatedOrder.status.toUpperCase();

      // Send update request to the backend
      const response = await fetch("/api/getAllOrdersInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: updatedOrder.orderId,
          status: updatedOrder.status,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order in the database");
      }

      const data = await response.json();
      console.log("Order updated:", data);

      // Update local state
      const updatedOrdersList = orders.map((order) =>
        order.orderId === updatedOrder.orderId ? updatedOrder : order
      );
      setOrders(updatedOrdersList);

      setSuccessMessage(`Order has been updated successfully in the database!`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update the order. Please try again.");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 16px",
          gap: 1,
        }}
      >
        <h1 style={{ fontWeight: "bold", fontSize: "50px", margin: 6 }}>
          Manage Book Orders
        </h1>

        {/* Search Bar with Icon */}
        <TextField
          variant="outlined"
          placeholder="Search by StudentID"
          sx={{
            width: "280px",
            "& .MuiOutlinedInput-root": { borderRadius: "2px", padding: "2px" },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      {/* Filter Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "4px 16px",
          gap: 1,
          marginTop: "-15px",
        }}
      >
        <Select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          displayEmpty
          sx={{ fontSize: "14px", marginLeft: "10px", height: "40px" }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="READY">READY</MenuItem>
          <MenuItem value="RECEIVED">RECEIVED</MenuItem>
          <MenuItem value="CANCELED">CANCELED</MenuItem>
          <MenuItem value="ORDERED">ORDERED</MenuItem>
          <MenuItem value="RETURNED">RETURNED</MenuItem>
          <MenuItem value="OVERDUE">OVERDUE</MenuItem>
          <MenuItem value="BORROWED">BORROWED</MenuItem>
        </Select>
      </Box>

      {/* Main Section */}
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#00843D" }}>
                  <TableCell sx={{ color: "#fff", fontSize: "22px" }}>
                    OrderID
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontSize: "22px" }}>
                    StudentID
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontSize: "22px" }}>
                    BookItem(s)
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontSize: "22px" }}>
                    Borrow Date
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontSize: "22px" }}>
                    Due Date
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontSize: "22px" }}>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map((order: any) => (
                  <TableRow
                    key={order.orderId}
                    sx={{
                      backgroundColor:
                        order.status === "OVERDUE"
                          ? "#ffebee"
                          : order.status === "RETURNED"
                          ? "#e8f5e9"
                          : order.status === "BORROWED"
                          ? "#e3f2fd"
                          : "#fff",
                    }}
                  >
                    <TableCell sx={{ fontSize: "18px" }}>
                      {order.orderId}
                    </TableCell>
                    <TableCell sx={{ fontSize: "18px" }}>
                      {order.studentId}
                    </TableCell>
                    <TableCell sx={{ fontSize: "18px" }}>
                      {order.bookTitles}
                    </TableCell>
                    <TableCell sx={{ fontSize: "18px" }}>
                      {formatDate(order.borrowDate)}
                    </TableCell>
                    <TableCell sx={{ fontSize: "18px" }}>
                      {formatDate(order.dueDate)}
                    </TableCell>
                    <TableCell sx={{ fontSize: "18px" }}>
                      {order.status}{" "}
                      {order.status === "OVERDUE" && <span>❗</span>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Success Message Box */}
      {successMessage && (
        <Box
          sx={{
            color: "green",
            fontSize: "20px",
            textAlign: "center",
            padding: "12px 20px",
            backgroundColor: "#dff0d8",
            marginBottom: "20px",
            position: "fixed",
            left: "20px",
            bottom: "20px",
            borderRadius: "4px",
            zIndex: 1000,
          }}
        >
          {successMessage}
        </Box>
      )}

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          padding: 4,
          backgroundColor: "#f5f5f5",
          textAlign: "right",
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={() => setModalOpen(true)}
          sx={{
            color: "#000",
            backgroundColor: "#9cb8b1",
            fontSize: "18px",
            padding: "12px 24px",
            height: "50px",
          }}
        >
          Update an Order
        </Button>
        <UpdateOrderModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          orders={orders}
          onUpdateOrder={handleUpdateOrder}
        />
      </Box>
    </Box>
  );
};

export default OrderPage;
