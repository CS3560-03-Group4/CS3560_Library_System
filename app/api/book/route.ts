import { db } from "@/lib/db";
import { getAllBooks } from "@prisma/client/sql";
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
