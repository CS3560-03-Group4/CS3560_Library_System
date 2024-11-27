import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getOrderDetailsByID } from "@prisma/client/sql";
import { get } from "http";

export async function GET(
  request: Request,
  { params }: { params: { orderID: string } }
) {
  const { orderID } = params;

  try {
    const orderItems = await db.$queryRawTyped(getOrderDetailsByID(orderID));

    if (orderItems.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    console.log(orderItems);
    const response = NextResponse.json({ orderItems });

    // Add Cache-Control header to the response
    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch (error) {
    console.error("Error fetching order details:", error);
    return NextResponse.json(
      { error: "Failed to fetch order details" },
      { status: 500 }
    );
  }
}
