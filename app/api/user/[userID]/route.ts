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
          const response = NextResponse.json({ ...user[0], ...student[0] });

          // Add Cache-Control header to the response
          response.headers.set("Cache-Control", "no-store");

          return response;
        }
      } else if (user[0].role === "STAFF") {
        const staff = await db.$queryRawTyped(getStaffByUserID(userID));
        if (staff.length > 0) {
          const response = NextResponse.json({ ...user[0], ...staff[0] });

          // Add Cache-Control header to the response
          response.headers.set("Cache-Control", "no-store");

          return response;
        }
      }
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
