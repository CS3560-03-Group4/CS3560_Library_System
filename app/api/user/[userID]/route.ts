import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserByUserID } from "@prisma/client/sql";

export async function GET(
  request: Request,
  { params }: { params: { userID: string } }
) {
  const { userID } = params;

  try {
    const user = await db.$queryRawTyped(getUserByUserID(userID));

    if (user.length > 0) {
      return NextResponse.json(user[0]);
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
