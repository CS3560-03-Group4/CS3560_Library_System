import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAllFinesByStudentID, createNewFine } from "@prisma/client/sql";

export async function GET(
  request: Request,
  { params }: { params: { studentID: string } }
) {
  const { studentID } = params;

  try {
    const fines = await db.$queryRawTyped(getAllFinesByStudentID(studentID));
    console.log(fines);

    if (!fines) {
      return NextResponse.json({ message: "No fines found" }, { status: 401 });
    }

    const response = NextResponse.json(
      {
        message: "Fetching fines successfully",
        fines,
      },
      { status: 200 }
    );

    // Add Cache-Control header to the response
    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch (error) {
    console.error("[ROUTE_FINE_GET] Error fetching fine data:", error);
    return NextResponse.json(
      { error: "Failed to fetch fine data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { studentID, amount, status, orderID } = await request.json();
  try {
    const newFine = await db.$queryRawTyped(
      createNewFine(amount, status, orderID, studentID)
    );

    if (!newFine) {
      return NextResponse.json(
        { message: "Failed to create a new fine" },
        { status: 400 }
      );
    }

    const response = NextResponse.json(
      {
        message: "Fine created successfully",
        newFine,
      },
      { status: 200 }
    );

    // Add Cache-Control header to the response
    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch (error) {
    console.error("[ROUTE_FINE_POST] Error creating fine:", error);
    return NextResponse.json(
      { error: "Failed to create fine" },
      { status: 500 }
    );
  }
}
