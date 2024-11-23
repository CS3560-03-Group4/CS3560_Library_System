import { db } from "@/lib/db";
import { getTotalBooks } from "@prisma/client/sql";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const totalBooks = await db.book.count();

        return NextResponse.json(
        {
        message: "Fetching books successfully",
        total: totalBooks,
        },
        { status: 200 }
        );
    } 
    catch (error) {
      console.error("[ROUTE_TOTAL_BOOKS] Error during fetching total number of books:", error);
      return NextResponse.json(
        { error: "An error occurred during fetching books" },
        { status: 500 }
      );
    }
  }