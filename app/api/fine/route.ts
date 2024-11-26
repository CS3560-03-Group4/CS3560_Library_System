import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAllFines } from "@prisma/client/sql";

export async function GET(request: Request) {
  try {
    const fines = await db.$queryRawTyped(getAllFines());
    console.log(fines);

    if (!fines) {
      return NextResponse.json({ message: "No fines found" }, { status: 401 });
    }

    return NextResponse.json(
      {
        message: "Fetching fines successfully",
        fines,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ROUTE_FINE_GET] Error fetching fine data:", error);
    return NextResponse.json(
      { error: "Failed to fetch fine data" },
      { status: 500 }
    );
  }
}
