import { db } from "@/lib/db";
import { getBookByTitle } from "@prisma/client/sql";
import { NextResponse } from "next/server";
import { title } from "process";

export async function GET() {
  try {
    const result = await db.$queryRawTyped(getBookByTitle(title));

    if (!result) {
      return NextResponse.json({ message: "No books found" }, { status: 401 });
    }

    return NextResponse.json(
      {
        message: "Fetching books successfully",
        result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ROUTE_BOOK_ID] Error during fetching books:", error);
    return NextResponse.json(
      { error: "An error occurred during fetching books" },
      { status: 500 }
    );
  }
}