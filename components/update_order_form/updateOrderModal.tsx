import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, Typography } from "@mui/material";

interface Order {
  orderId: string;
  studentId: string;
  bookIds: string;
  borrowDate: string;
  dueDate: string;
  status: string;
}

const UpdateOrderModal: React.FC<{ open: boolean; onClose: () => void; orders: Order[]; onUpdateOrder: (updatedOrder: Order) => void }> = ({ open, onClose, orders, onUpdateOrder }) => {
  const [orderId, setOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (orderId) {
      const foundOrder = orders.find((order) => order.orderId === orderId);
      if (foundOrder) {
        setOrderDetails(foundOrder);
        setStatus(foundOrder.status);
      } else {
        setOrderDetails(null);
      }
    } else {
      setOrderDetails(null);
    }
  }, [orderId, orders]);

  const handleSubmit = () => {
    if (orderDetails) {
      const updatedOrder = { ...orderDetails, status };
      onUpdateOrder(updatedOrder);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          fontSize: "48px",
          fontWeight: "bold",
          color: "green",
          marginBottom: 0,
        }}
      >
        Update Order
      </DialogTitle>
      <Typography
        sx={{
          fontSize: "18px",
          marginTop: -2,
          paddingLeft: 3
        }}
      >
        Enter OrderID to view and update status.
      </Typography>

      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="OrderID"
          required
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        {orderDetails ? (
          <>
            <TextField fullWidth margin="dense" label="Borrower Name" value={orderDetails.studentId} disabled />
            <TextField fullWidth margin="dense" label="StudentID" value={orderDetails.studentId} disabled />
            <TextField fullWidth margin="dense" label="BookID(s)" value={orderDetails.bookIds} disabled />
            <TextField fullWidth margin="dense" label="Borrow Date" value={orderDetails.borrowDate} disabled />
            <TextField fullWidth margin="dense" label="Due Date" value={orderDetails.dueDate} disabled />
            <TextField
              select
              fullWidth
              margin="dense"
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="Ordered">Ordered</MenuItem>
              <MenuItem value="Returned">Returned</MenuItem>
              <MenuItem value="Overdue">Overdue</MenuItem>
              <MenuItem value="Borrowed">Borrowed</MenuItem>
            </TextField>
          </>
        ) : (
          <Typography sx={{ color: "red", marginTop: 2 }}>OrderID not found</Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} sx={{ color: "#757575" }}>
          Cancel
        </Button>
        <Button variant="contained" sx={{ backgroundColor: "green", color: "#fff" }} onClick={handleSubmit} disabled={!orderDetails}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateOrderModal;
