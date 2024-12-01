import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import {
  createNewOrder,
  addBookItem,
  updateBookQuantity,
  getAllOrdersByStudentID,
} from "@prisma/client/sql";

export async function POST(
  req: Request,
  { params }: { params: { studentID: string } }
) {
  const { studentID } = params;
  const { totalItems, orderDate, dueDate, status, orderItems } =
    await req.json();
  try {
    const newOrder = await db.$queryRawTyped(
      createNewOrder(
        totalItems,
        new Date(orderDate),
        new Date(dueDate),
        status,
        studentID
      )
    );
    if (!newOrder) {
      return NextResponse.json(
        { message: "Failed to create a new order" },
        { status: 400 }
      );
    }

    const orderID = newOrder[0].orderID;

    if (!orderItems) {
      return NextResponse.json(
        { message: "Failed to create a new order - No order items" },
        { status: 400 }
      );
    }

    for (let i = 0; i < orderItems.length; i++) {
      const bookID = orderItems[i];
      // add each book item to an order
      await db.$queryRawTyped(addBookItem(orderID, bookID));
      // decrease the quantity of the book in BookInventory
      await db.$queryRawTyped(updateBookQuantity(bookID));
    }

    const response = NextResponse.json(
      {
        message: "Order created successfully",
        orderID: orderID,
      },
      { status: 200 }
    );

    // Add Cache-Control header to the response
    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch (error) {
    console.error("[API_ORDERS] Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { studentID: string } }
) {
  const { studentID } = params;

  try {
    const orders = await db.$queryRawTyped(getAllOrdersByStudentID(studentID));
    console.log(orders);

    if (orders.length === 0) {
      return NextResponse.json({ error: "Orders not found" }, { status: 404 });
    }

    const response = NextResponse.json(
      {
        message: "Fetching orders successfully",
        orders,
      },
      { status: 200 }
    );

    // Add Cache-Control header to the response
    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch (error) {
    console.error("[API_ORDERS] Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
