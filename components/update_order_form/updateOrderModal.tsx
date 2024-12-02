import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Typography,
} from "@mui/material";
import { formatDate } from "@/lib/utils";

interface Order {
  orderId: string;
  studentId: string;
  bookTitles: string;
  borrowDate: string;
  dueDate: string;
  status: string;
}

const UpdateOrderModal: React.FC<{
  open: boolean;
  onClose: () => void;
  selectedOrder: Order | null; // Updated to accept the selectedOrder directly
  onUpdateOrder: (updatedOrder: Order) => void;
}> = ({ open, onClose, selectedOrder, onUpdateOrder }) => {
  const [status, setStatus] = useState("");

  // Sync the selectedOrder's status with the local state when it changes
  useEffect(() => {
    if (selectedOrder) {
      setStatus(selectedOrder.status);
    }
  }, [selectedOrder]);

  const handleSubmit = () => {
    if (selectedOrder) {
      const updatedOrder = { ...selectedOrder, status };
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
      <DialogContent>
        {selectedOrder ? (
          <>
            <TextField
              fullWidth
              margin="dense"
              label="OrderID"
              value={selectedOrder.orderId}
              disabled
            />
            <TextField
              fullWidth
              margin="dense"
              label="Borrower Name"
              value={selectedOrder.studentId}
              disabled
            />
            <TextField
              fullWidth
              margin="dense"
              label="StudentID"
              value={selectedOrder.studentId}
              disabled
            />
            <TextField
              fullWidth
              margin="dense"
              label="Book Titles"
              value={selectedOrder.bookTitles}
              disabled
            />
            <TextField
              fullWidth
              margin="dense"
              label="Borrow Date"
              value={formatDate(selectedOrder.borrowDate)}
              disabled
            />
            <TextField
              fullWidth
              margin="dense"
              label="Due Date"
              value={formatDate(selectedOrder.dueDate)}
              disabled
            />
            <TextField
              select
              fullWidth
              margin="dense"
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="READY">READY</MenuItem>
              <MenuItem value="RECEIVED">RECEIVED</MenuItem>
              <MenuItem value="CANCELED">CANCELED</MenuItem>
              <MenuItem value="ORDERED">ORDERED</MenuItem>
              <MenuItem value="RETURNED">RETURNED</MenuItem>
              <MenuItem value="OVERDUE">OVERDUE</MenuItem>
              <MenuItem value="BORROWED">BORROWED</MenuItem>
            </TextField>
          </>
        ) : (
          <Typography sx={{ color: "red", marginTop: 2 }}>
            No order selected. Please select an order to edit.
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} sx={{ color: "#757575" }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "green", color: "#fff" }}
          onClick={handleSubmit}
          disabled={!selectedOrder}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateOrderModal;
