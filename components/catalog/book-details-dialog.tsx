import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { BookCatalogProps } from "./columns";

interface BookDetailsDialogProps {
  selectedBook: BookCatalogProps | null;
  isDialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}
export default function BookDetailsDialog({
  selectedBook,
  isDialogOpen,
  setDialogOpen,
}: BookDetailsDialogProps) {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={() => setDialogOpen(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Book Details</DialogTitle>
      <DialogContent>
        {selectedBook && (
          <div>
            <p>
              <strong>Book ID:</strong> {selectedBook.bookID}
            </p>
            <p>
              <strong>Title:</strong> {selectedBook.title}
            </p>
            <p>
              <strong>Author:</strong> {selectedBook.author}
            </p>
            <p>
              <strong>Date Published:</strong> {selectedBook.datePublished}
            </p>
            <p>
              <strong>Publisher:</strong> {selectedBook.publisher}
            </p>
            <p>
              <strong>Number of Pages:</strong> {selectedBook.numberOfPages}
            </p>
            <p>
              <strong>Genre:</strong> {selectedBook.genre}
            </p>
            <p>
              <strong>Quantity:</strong> {selectedBook.quantity}
            </p>
            <p>
              <strong>Description:</strong> {selectedBook.description}
            </p>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
