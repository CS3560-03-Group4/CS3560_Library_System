"use client";

import React, { useState } from "react";
import { Box, Drawer, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import UpdateOrderModal from "@/components/update_order_form/updateOrderModal"; 

const orders = [
  {
    orderId: "000-111-1001",
    studentId: "S085",
    bookIds: "JENN1234, AUST6368, ...",
    borrowDate: "2024-10-15",
    dueDate: "2024-11-14",
    status: "Overdue",
  },
  {
    orderId: "000-111-1000",
    studentId: "S025",
    bookIds: "AUGS9235, ILJK1997",
    borrowDate: "2024-11-01",
    dueDate: "2024-11-15",
    status: "Borrowed",
  },
  {
    orderId: "000-111-0999",
    studentId: "S068",
    bookIds: "MONT1111, FEBR9475",
    borrowDate: "2024-10-29",
    dueDate: "2024-11-12",
    status: "Returned",
  },
  {
    orderId: "000-111-0998",
    studentId: "S382",
    bookIds: "MEEE9384, NEDU6338, ...",
    borrowDate: "2024-10-05",
    dueDate: "2024-12-05",
    status: "Ordered",
  },
  {
    orderId: "000-111-0997",
    studentId: "S112",
    bookIds: "ENCY2331, MMMT8361, ...",
    borrowDate: "2024-11-10",
    dueDate: "2024-11-29",
    status: "Borrowed",
  },
];

const OrderPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [updatedOrders, setUpdatedOrders] = useState(orders);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleUpdateOrder = (updatedOrder: any) => {
    const updatedOrdersList = updatedOrders.map((order) =>
      order.orderId === updatedOrder.orderId ? updatedOrder : order
    );

    setUpdatedOrders(updatedOrdersList);
    
    // Set the success message
    setSuccessMessage(`Order ${updatedOrder.orderId} has been updated successfully!`);

    // Hide the success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 16px", // Reduced padding
          gap: 1, // Minimal spacing between elements
        }}>
        {/* Header */}
        <h1 style={{ fontWeight: "bold", fontSize: "56px", margin: 6 }}>Orders</h1> 

        {/* Search Bar with Icon */}
        <TextField
          variant="outlined"
          placeholder="Search by OrderID"
          sx={{
            width: "280px", // Slightly reduced width
            '& .MuiOutlinedInput-root': {
              borderRadius: "2px",
              padding: "2px", // Reduced internal padding
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Filter and Sort Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "4px 16px", // Reduced padding
          gap: 1,
          marginTop: "-15px",
        }}
      >
        <Button variant="contained" sx={{ color: "#000", backgroundColor: "#e3f2fd", fontSize: "14px" }}> {/* Reduced font size */}
          Filter
        </Button>
        <Button variant="contained" sx={{ color: "#000", backgroundColor: "#e8f5e9", fontSize: "14px" }}>
          Sort
        </Button>
      </Box>

      {/* Main Section */}
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {/* Table Content */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#00843D" }}>
                  <TableCell sx={{ color: "#fff", fontSize: "22px"  }}>OrderID</TableCell>
                  <TableCell sx={{ color: "#fff", fontSize: "22px"  }}>StudentID</TableCell>
                  <TableCell sx={{ color: "#fff", fontSize: "22px"  }}>BookID(s)</TableCell>
                  <TableCell sx={{ color: "#fff", fontSize: "22px"  }}>Borrow Date</TableCell>
                  <TableCell sx={{ color: "#fff", fontSize: "22px"  }}>Due Date</TableCell>
                  <TableCell sx={{ color: "#fff", fontSize: "22px"  }}>Status</TableCell>
                  <TableCell sx={{ color: "#fff", fontSize: "22px"  }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {updatedOrders.map((order) => (
                  <TableRow
                    key={order.orderId}
                    sx={{
                      backgroundColor:
                        order.status === "Overdue"
                          ? "#ffebee"
                          : order.status === "Returned"
                          ? "#e8f5e9"
                          : order.status === "Borrowed"
                          ? "#e3f2fd"
                          : "#fff",
                    }}
                  >
                    <TableCell sx={{ fontSize: "18px" }}>{order.orderId}</TableCell>
                    <TableCell sx={{ fontSize: "18px" }}>{order.studentId}</TableCell>
                    <TableCell sx={{ fontSize: "18px" }}>{order.bookIds}</TableCell>
                    <TableCell sx={{ fontSize: "18px" }}>{order.borrowDate}</TableCell>
                    <TableCell sx={{ fontSize: "18px" }}>{order.dueDate}</TableCell>
                    <TableCell sx={{ fontSize: "18px" }}>
                      {order.status} {order.status === "Overdue" && <span>❗</span>}
                    </TableCell>
                    <TableCell sx={{ fontSize: "18px" }}>
                      <Button variant="text" >ℹ️</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
        <span>
          <strong style={{ color: "green" }}>1</strong> (Total 5 of 5)
        </span>
      </Box>

      {/* Success Message Box */}
      {successMessage && (
        <Box
        sx={{
          color: "green",
          fontSize: "20px",  // Smaller font size for the left-side box
          textAlign: "center",
          padding: "12px 20px",  // Adjust padding for a smaller box
          backgroundColor: "#dff0d8",  // Light green background
          marginBottom: "20px",  // Space between the message and the next content
          position: "fixed",  // Fixed position to stay at the left side even when scrolling
          left: "20px",  // Position the box on the left
          bottom: "20px",  // Position it slightly above the bottom edge
          borderRadius: "4px",  // Optional: Rounded corners
          zIndex: 1000,  // Ensure the message appears above other elements
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
        <Button variant="contained" 
          sx={{
            color: "#000",
            backgroundColor: "#a1ebda",
            fontSize: "18px", // Larger font size for the button text
            padding: "12px 24px", // Bigger padding to make the button larger
            height: "50px", // Optional: set a fixed height for the button
          }}>
          Create an Order
        </Button>
        <Button variant="contained" onClick={() => setModalOpen(true)}
          sx={{
            color: "#000",
            backgroundColor: "#9cb8b1",
            fontSize: "18px", // Larger font size for the button text
            padding: "12px 24px", // Bigger padding to make the button larger
            height: "50px", // Optional: set a fixed height for the button
          }}>
          Update an Order
        </Button>
        <UpdateOrderModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          orders={updatedOrders}
          onUpdateOrder={handleUpdateOrder}
        />
      </Box>
    </Box>
  );
};

export default OrderPage;
