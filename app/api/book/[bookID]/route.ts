import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getBookByBookID } from "@prisma/client/sql";

export async function GET(
  request: Request,
  { params }: { params: { bookID: string } }
) {
  const { bookID } = params;

  try {
    const book = await db.$queryRawTyped(getBookByBookID(bookID));

    console.log("BOOK INFO: ", book[0]);
    if (!book || book.length === 0) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json({ ...book[0] });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch book data" },
      { status: 500 }
    );
  }
}
