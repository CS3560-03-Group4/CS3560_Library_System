"use client";

import {
  BookCatalogProps,
  columns as initialColumns,
} from "@/components/catalog/columns";
import { DataTable } from "@/components/catalog/data-table";
import { formatDate } from "@/lib/utils";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import BookDetailsDialog from "@/components/catalog/book-details-dialog";
import AddBookDialog from "@/components/catalog/add-book-dialog";
import UpdateBookDialog from "@/components/catalog/update-book-catalog";
import { toast } from "react-toastify";
import RemoveBookDialog from "@/components/catalog/remove-book-dialog";

export default function Catalog() {
  const [books, setBooks] = useState<BookCatalogProps[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookCatalogProps | null>(
    null
  );
  // State for opening different dialogs
  const [isDialogOpen, setDialogOpen] = useState(false); // State for book details dialog
  const [isAddDialogOpen, setAddDialogOpen] = useState(false); // State for adding book dialog
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false); // State for updating book dialog
  const [isRemoveDialogOpen, setRemoveDialogOpen] = useState(false); // State for removing book dialog

  // State for request loading
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  // State for rerendering
  const [isAdded, setIsAdded] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  // Add book logic
  const handleAddBook = async (newBook: any) => {
    setIsAdding(true);
    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newBook,
          genre: newBook.genre.join(", "),
        }),
      });

      if (!response.ok) {
        toast.error("Failed to add book", {
          position: "top-right",
          autoClose: 3000,
        });
        throw new Error("Failed to add book");
      }

      const data = await response.json();
      console.log(data);

      toast.success("Book added successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
      setIsAdded(true);
    } catch (error) {
      console.error("Error adding book:", error);
    } finally {
      setIsAdding(false);
    }
  };

  // Update book logic
  const handleUpdateBook = async (updatedBook: any) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/book/${selectedBook?.bookID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...updatedBook,
          genre: updatedBook.genre.join(", "),
        }),
      });

      if (!response.ok) {
        toast.error("Failed to update book", {
          position: "top-center",
          autoClose: 3000,
        });
        throw new Error("Failed to update book");
      }

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.bookID === selectedBook?.bookID
            ? { ...book, ...updatedBook }
            : book
        )
      );

      toast.success("Book updated successfully!", {
        position: "top-center",
        autoClose: 3000,
      });

      setIsUpdated(true);
    } catch (error) {
      console.error("Error updating book:", error);
    } finally {
      setIsUpdating(false);
      setUpdateDialogOpen(false);
    }
  };

  // Remove book logic
  const handleRemoveBook = async (bookID: string) => {
    setIsRemoving(true);
    try {
      const response = await fetch(`/api/book/${bookID}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        toast.error("Failed to remove book", {
          position: "top-center",
          autoClose: 3000,
        });
        throw new Error("Failed to remove book");
      }

      setIsRemoved(true);
    } catch (error) {
      console.error("Error removing book:", error);
    } finally {
      setIsRemoving(false);
      setRemoveDialogOpen(false);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/book");
        const data = await response.json();
        const { books } = data;
        console.log(books);
        const allBooks = await Promise.all(
          books.map(async (book: BookCatalogProps) => {
            const response = await fetch(`/api/book/${book.bookID}`);
            const data = await response.json();
            const quantity = data.quantity;
            return { ...book, quantity };
          })
        );

        console.log(allBooks);
        setBooks(
          allBooks.map((book: BookCatalogProps) => ({
            ...book,
            datePublished: formatDate(book.datePublished),
          }))
        );
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [isAdded, isUpdated, isRemoved]);

  // Extend the columns to include the "View book details" action
  const columns = initialColumns.map((column) => {
    if (column.id === "actions") {
      return {
        ...column,
        cell: ({ row }: any) => {
          const book = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-[#000000] text-white rounded-xl"
              >
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white" />
                <DropdownMenuItem
                  className="hover:bg-white hover:text-black rounded-xl cursor-pointer"
                  onClick={() => navigator.clipboard.writeText(book.bookID)}
                >
                  Copy book ID
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-white hover:text-black rounded-xl cursor-pointer"
                  onClick={() => {
                    setSelectedBook(book);
                    setDialogOpen(true);
                  }}
                >
                  View book details
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-white hover:text-black rounded-xl cursor-pointer"
                  onClick={() => {
                    setSelectedBook(book);
                    setUpdateDialogOpen(true);
                  }}
                >
                  Update book
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-white hover:text-black rounded-xl cursor-pointer"
                  onClick={() => {
                    setSelectedBook(book);
                    setRemoveDialogOpen(true);
                  }}
                >
                  Remove book
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      };
    }
    return column;
  });

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
          <Typography sx={{ mt: 2 }}>
            Fetching all books from database...
          </Typography>
        </Box>
      ) : (
        <>
          <div className="mt-5 mx-5 border-green-300">
            <h1
              style={{
                fontWeight: "bold",
                fontSize: "clamp(1.5rem, 2.5vw, 3rem)",
                margin: 6,
              }}
            >
              Manage Book Catalog
            </h1>
            <DataTable columns={columns} data={books} />

            <div className="my-4 border-green-300">
              <div className="flex justify-end">
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#00843D" }}
                  onClick={() => setAddDialogOpen(true)}
                >
                  Add Book
                </Button>
              </div>
            </div>
          </div>

          {/* Dialog for showing book details */}
          <BookDetailsDialog
            selectedBook={selectedBook}
            isDialogOpen={isDialogOpen}
            setDialogOpen={setDialogOpen}
          />

          {/* Add Book Dialog */}
          <AddBookDialog
            isDialogOpen={isAddDialogOpen}
            isSubmitting={isAdding}
            setDialogOpen={setAddDialogOpen}
            onSubmit={handleAddBook}
          />

          {/* Update Book Dialog */}
          <UpdateBookDialog
            selectedBook={selectedBook}
            isDialogOpen={isUpdateDialogOpen}
            isSubmitting={isUpdating}
            setDialogOpen={setUpdateDialogOpen}
            onSubmit={handleUpdateBook}
          />

          {/* Remove Book Dialog */}
          <RemoveBookDialog
            selectedBook={selectedBook}
            isDialogOpen={isRemoveDialogOpen}
            isSubmitting={isRemoving}
            setDialogOpen={setRemoveDialogOpen}
            onRemove={handleRemoveBook}
          />
        </>
      )}
    </>
  );
}
