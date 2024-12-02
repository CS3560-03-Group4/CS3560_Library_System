import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  getBookByBookID,
  getQuantityByBookID,
  removeBookByBookID,
  removeBookInventoryByBookID,
  updateBookInfoByBookID,
  updateBookInventoryByBookID,
} from "@prisma/client/sql";

export async function GET(
  request: Request,
  { params }: { params: { bookID: string } }
) {
  const { bookID } = params;

  try {
    const book = await db.$queryRawTyped(getBookByBookID(bookID)); // Get book info from DB
    const quantity = await db.$queryRawTyped(getQuantityByBookID(bookID)); // Get quantity in stock from DB
    console.log(book);
    // Check if the book was not found
    if (book.length === 0) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    const response = NextResponse.json(
      { ...book[0], quantity: quantity[0].quantity },
      { status: 200 }
    );

    // Add Cache-Control header to the response
    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch (error) {
    console.error("Error fetching book data:", error);
    return NextResponse.json(
      { error: "Failed to fetch book data" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { bookID: string } }
) {
  const { bookID } = params;
  const {
    title,
    author,
    datePublished,
    publisher,
    genre,
    numberOfPages,
    description,
    imageURL,
    quantity,
  } = await request.json();

  try {
    const updatedBook = await db.$queryRawTyped(
      updateBookInfoByBookID(
        bookID,
        title,
        author,
        new Date(datePublished),
        publisher,
        genre,
        numberOfPages,
        description,
        imageURL
      )
    );

    if (!updatedBook) {
      // Check if the book was not found
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    const updateQuantity = await db.$queryRawTyped(
      updateBookInventoryByBookID(quantity, bookID)
    );

    if (!updateQuantity) {
      // Check if the book was not found
      return NextResponse.json(
        { error: "Book not found in book inventory" },
        { status: 404 }
      );
    }

    const response = NextResponse.json(
      { message: "Book updated successfully", updatedBook },
      { status: 200 }
    );

    // Add Cache-Control header to the response
    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch (error) {
    console.error("[ROUTE_BOOK_ID_PUT] Error updating book:", error);
    return NextResponse.json(
      { error: "Failed to update book" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { bookID: string } }
) {
  const { bookID } = params;
  try {
    const removeQuantity = await db.$queryRawTyped(
      removeBookInventoryByBookID(bookID)
    );

    if (!removeQuantity) {
      // Check if the book was not found
      return NextResponse.json(
        { error: "Book not found in BookInventory" },
        { status: 404 }
      );
    }

    const removedBook = await db.$queryRawTyped(
      removeBookByBookID(params.bookID)
    );

    if (!removedBook) {
      // Check if the book was not found
      return NextResponse.json(
        { error: "Book not found in Book table" },
        { status: 404 }
      );
    }

    const response = NextResponse.json(
      { message: "Book deleted successfully", removedBook },
      { status: 200 }
    );

    // Add Cache-Control header to the response
    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json(
      { error: "Failed to delete book" },
      { status: 500 }
    );
  }
}
