import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
    getBookByBookID,
    getQuantityByBookID
} from "@prisma/client/sql";

export async function GET(
  request: Request,
  { params }: { params: { bookID: string } }
) {
  const { bookID } = params;

  try {
    const book = await db.$queryRawTyped(getBookByBookID(bookID));  // Get book info from DB
    const quantity = await db.$queryRawTyped(getQuantityByBookID(bookID));  // Get quantity in stock from DB
    console.log(book);
    // Check if the book was not found
    if (book.length === 0) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    const response = NextResponse.json({ ...book[0], quantity: quantity[0].quantity });

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