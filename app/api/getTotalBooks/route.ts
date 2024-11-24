import { db } from "@/lib/db";
import { getTotalBooks } from "@prisma/client/sql";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const totalBooksResult = await db.$queryRawTyped(getTotalBooks());

    // Safely handle BigInt value
    const totalBooks =
      totalBooksResult[0]?.count !== undefined
        ? Number(totalBooksResult[0].count) // Convert BigInt to Number
        : 0;

    console.log("TOTAL BOOKS:", totalBooks);
    return NextResponse.json(
      {
        message: "Fetching books successfully",
        total: totalBooks,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "[ROUTE_TOTAL_BOOKS] Error during fetching total number of books:",
      error
    );
    return NextResponse.json(
      { error: "An error occurred during fetching books" },
      { status: 500 }
    );
  }
}
