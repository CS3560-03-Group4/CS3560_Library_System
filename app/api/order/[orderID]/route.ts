import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getOrderDetailsByID, updateOrderStatus } from "@prisma/client/sql";

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
    const response = NextResponse.json({ orderItems }, { status: 200 });

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

export async function PUT(
  req: Request,
  { params }: { params: { orderID: string } }
) {
  const { orderID } = params;
  const { status } = await req.json();
  try {
    const updatedOrder = await db.$queryRawTyped(
      updateOrderStatus(status, orderID)
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { error: "Failed to update order status" },
        { status: 400 }
      );
    }
    const response = NextResponse.json({ updatedOrder }, { status: 200 });

    // Add Cache-Control header to the response
    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { error: "Failed to update order status" },
      { status: 500 }
    );
  }
}
