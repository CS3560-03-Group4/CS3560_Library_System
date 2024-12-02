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
  CircularProgress,
  Typography,
  TablePagination,
} from "@mui/material";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import UpdateOrderModal from "@/components/update_order_form/updateOrderModal";
import { formatDate } from "@/lib/utils";
import { toast } from "react-toastify";

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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllOrdersInfo = async () => {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllOrdersInfo();
  }, []);

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
        toast.error("Failed to update order in the database", {
          position: "top-center",
          autoClose: 3000,
        });
        throw new Error("Failed to update order in the database");
      }

      const data = await response.json();
      console.log("Order updated:", data);

      // Update local state
      const updatedOrdersList = orders.map((order) =>
        order.orderId === updatedOrder.orderId ? updatedOrder : order
      );
      setOrders(updatedOrdersList);

      toast.success("Order updated successfully", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update the order. Please try again.");
    }
  };

  const handleEditClick = (orderId: Order) => {
    setSelectedOrder(orderId);
    setModalOpen(true);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          <Typography sx={{ mt: 2 }}>Fetching all book data...</Typography>
        </Box>
      ) : (
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
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

            {/* Search Bar */}
            <TextField
              variant="outlined"
              placeholder="Search by StudentID"
              sx={{
                width: "280px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "2px",
                  padding: "2px",
                },
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
                    <TableCell sx={{ color: "#fff", fontSize: "22px" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? filteredOrders.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : filteredOrders
                  ).map((order) => (
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

                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleEditClick(order)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredOrders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>

          {/* Update Order Modal */}
          <UpdateOrderModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            selectedOrder={selectedOrder} // Pass the selected order here
            onUpdateOrder={handleUpdateOrder}
          />
        </Box>
      )}
    </>
  );
};

export default OrderPage;
