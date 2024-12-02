import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { BookCatalogProps } from "./columns";

interface RemoveBookDialogProps {
  selectedBook: BookCatalogProps | null;
  isDialogOpen: boolean;
  isSubmitting: boolean;
  setDialogOpen: (open: boolean) => void;
  onRemove: (bookID: string) => void; // Handle book removal logic in parent component
}

export default function RemoveBookDialog({
  selectedBook,
  isSubmitting,
  isDialogOpen,
  setDialogOpen,
  onRemove,
}: RemoveBookDialogProps) {
  const handleRemove = () => {
    if (selectedBook) {
      onRemove(selectedBook.bookID); // Call the onRemove function to handle the book removal
      setDialogOpen(false); // Close the dialog
      toast.success(`Book "${selectedBook.title}" has been removed.`, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Confirm Removal</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove the book{" "}
          <strong>{selectedBook?.title}</strong>? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
        <Button
          onClick={handleRemove}
          sx={{ backgroundColor: "#D32F2F", color: "white" }}
        >
          {isSubmitting ? "Removing..." : "Remove"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
