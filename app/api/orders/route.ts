import { db } from "@/lib/db";
import { readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
      console.log("Fetching orders...");
      const getOrdersQuery = readFileSync(
        join(process.cwd(), "prisma/sql/getOrders.sql"),
        "utf8"
      );
  
      console.log("Query:", getOrdersQuery);
      const userID = 1; // Replace with dynamic userID if available
      const orders = await db.$queryRawUnsafe(getOrdersQuery, userID);
  
      console.log("Orders fetched:", orders);
  
      if (!orders || orders.length === 0) {
        return NextResponse.json(
          { message: "No orders found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json({ orders }, { status: 200 });
    } catch (error) {
      console.error("[API_ORDERS] Error fetching orders:", error);
      return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
  }
  