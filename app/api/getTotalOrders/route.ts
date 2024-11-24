import { db } from "@/lib/db";
import { getTotalOrders } from "@prisma/client/sql";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const totalOrdersResult = await db.$queryRawTyped(getTotalOrders());

    // Safely handle BigInt value
    const totalOrders =
      totalOrdersResult[0]?.count !== undefined
        ? Number(totalOrdersResult[0].count) // Convert BigInt to Number
        : 0;

    // console.log("TOTAL ORDERS:", totalOrders);
    return NextResponse.json(
      {
        message: "Fetching orders successfully",
        total: totalOrders,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "[ROUTE_BOOK_ID] Error during fetching total number of orders:",
      error
    );
    return NextResponse.json(
      { error: "An error occurred during fetching orders" },
      { status: 500 }
    );
  }
}
