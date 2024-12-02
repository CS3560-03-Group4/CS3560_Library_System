import { db } from "@/lib/db";
import { addBookQuantityByBookID, createNewBook, getAllBooks } from "@prisma/client/sql";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const books = await db.$queryRawTyped(getAllBooks());

    if (!books) {
      return NextResponse.json({ message: "No books found" }, { status: 401 });
    }

    const response = NextResponse.json(
      {
        message: "Fetching books successfully",
        books,
      },
      { status: 200 }
    );

    // Add Cache-Control header to the response
    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch (error) {
    console.error("[ROUTE_BOOK_ID] Error during fetching books:", error);
    return NextResponse.json(
      { error: "An error occurred during fetching books" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
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
    const newBook = await db.$queryRawTyped(
      createNewBook(
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
    console.log("NEW BOOK: ", newBook);

    if (!newBook) {
      return NextResponse.json(
        { message: "Failed to create a new book" },
        { status: 400 }
      );
    }

    const addQuantity = await Promise.all(
      newBook.map(async (book) => {
        await db.$queryRawTyped(addBookQuantityByBookID(book.bookID, quantity));
      })
    );
    console.log("ADD QUANTITY: ", addQuantity);

    if (!addQuantity) {
      return NextResponse.json(
        { message: "Failed to add quantity to book" },
        { status: 400 }
      );
    }

    const response = NextResponse.json(
      {
        message: "Book created successfully",
        newBook,
        addQuantity,
      },
      { status: 201 }
    );

    // Add Cache-Control header to the response
    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch (error) {
    console.error("[ROUTE_BOOK_POST] Error creating book:", error);
    return NextResponse.json(
      { error: "Failed to create book" },
      { status: 500 }
    );
  }
}