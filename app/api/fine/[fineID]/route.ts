import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { updateFineStatus } from "@prisma/client/sql";

export async function PATCH(
  req: Request,
  { params }: { params: { fineID: string } }
) {
  const { fineID } = params;
  const { status } = await req.json();
  try {
    const updatedFine = await db.$queryRawTyped(
      updateFineStatus(status, fineID)
    );

    console.log(updatedFine);

    if (!updatedFine) {
      return NextResponse.json(
        { message: "Failed to update fine status" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Updating fine status to : " + status + " successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ROUTE_FINE_POST] Error updating fine status:", error);
    return NextResponse.json(
      { error: "Failed to update fine status" },
      { status: 500 }
    );
  }
}
