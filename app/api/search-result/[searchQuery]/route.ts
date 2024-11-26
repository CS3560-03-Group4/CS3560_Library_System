import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { searchBook } from "@prisma/client/sql";

export async function GET(
  request: Request,
  { params }: { params: { searchQuery: string } }
) {
  const { searchQuery } = params;

  try {
    const results = await db.$queryRawTyped(searchBook(searchQuery)); // search book from DB
    console.log(results);
    // Check if the book was not found
    if (results.length === 0) {
      return NextResponse.json({ error: "No result found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Search results", data: results },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ROUTE_SEARCH] Error during search:", error);
    return NextResponse.json(
      { message: "An error occurred during search" },
      { status: 500 }
    );
  }
}