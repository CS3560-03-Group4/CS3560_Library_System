import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  getStaffByUserID,
  getStudentByUserID,
  getUserByUserID,
} from "@prisma/client/sql";

export async function GET(
  request: Request,
  { params }: { params: { userID: string } }
) {
  const { userID } = params;

  try {
    const user = await db.$queryRawTyped(getUserByUserID(userID));
    if (user.length > 0) {
      if (user[0].role === "STUDENT") {
        const student = await db.$queryRawTyped(getStudentByUserID(userID));
        if (student.length > 0) {
          return NextResponse.json({ ...user[0], ...student[0] });
        }
      } else if (user[0].role === "STAFF") {
        const staff = await db.$queryRawTyped(getStaffByUserID(userID));
        if (staff.length > 0) {
          return NextResponse.json({ ...user[0], ...staff[0] });
        }
      }
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
