import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createNewPayment } from "@prisma/client/sql";

export async function POST(req: Request) {
  const { fineID, studentID, paymentMethod, paymentDate, amount } =
    await req.json();

  try {
    const newPayment = await db.$queryRawTyped(
      createNewPayment(
        amount,
        paymentMethod,
        new Date(paymentDate), // Convert to Date object
        studentID,
        fineID
      )
    );

    if (!newPayment) {
      return NextResponse.json(
        { message: "Payment not created" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Payment created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "[ROUTE_PAYMENT_POST] Error when creating a new payment:",
      error
    );
    return NextResponse.json(
      { message: "An error occurred during creating new payment" },
      { status: 500 }
    );
  }
}
