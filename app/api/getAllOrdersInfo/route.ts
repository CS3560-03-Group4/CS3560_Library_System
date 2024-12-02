import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { db } from "@/lib/db";
//import { updateOrderStatus } from '@/prisma/sql/updateOrderStatus.sql';

export async function GET() {
  try {
    const orders = await prisma.$queryRaw`
      SELECT bo."orderID" AS "OrderID",
       bo."studentID" AS "StudentID",
       ARRAY_AGG(b."title") AS "BookItem(s)",
       bo."orderDate" AS "Order Date",
       bo."dueDate" AS "Due Date",
       bo."status" AS "Status"
      FROM public."BookOrder" bo
      JOIN public."BookItem" bi ON bo."orderID" = bi."orderID"
      JOIN public."Book" b on bi."bookID" = b."bookID"
      GROUP BY bo."orderID", bo."studentID"
    `;

    // console.log("Fetched orders:", JSON.stringify(orders, null, 2));
    return NextResponse.json(orders, { status: 200 });
  } 
  catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const { orderId, status } = await request.json();

    // Validate inputs
    if (!orderId || !status) {
      return NextResponse.json(
        { error: "Order ID and status are required" },
        { status: 400 }
      );
    }

    // Ensure explicit type casting for the enum column
    const updatedOrder: any[] = await prisma.$queryRawUnsafe(
      `UPDATE "BookOrder" 
       SET "status" = $1::"OrderStatus" 
       WHERE "orderID" = $2 
       RETURNING "orderID", "status";`,
      status,
      orderId
    );

    if (!updatedOrder || updatedOrder.length === 0) {
      return NextResponse.json(
        { error: "Order not found or no changes made" },
        { status: 404 }
      );
    }

    // Respond with the updated order
    return NextResponse.json(
      { message: "Order status updated successfully", order: updatedOrder[0] },
      { status: 200 }
    );
  } catch (error) {
    // Handle errors
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { error: "Failed to update the order" },
      { status: 500 }
    );
  }
}