import { db } from "@/lib/db";
import { getUserByUsername } from "@prisma/client/sql";
import { compare } from "bcryptjs"; //For password comparison
import jwt from "jsonwebtoken"; // For generating JWT tokens
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET_KEY || "secret";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // Validation check (you can improve this further)
  if (!username || !password) {
    return NextResponse.json(
      { message: "Username and password are required" },
      { status: 400 }
    );
  }

  try {
    const user = await db.$queryRawTyped(getUserByUsername(username));

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare the password with the stored hash
    const isPasswordValid = await compare(password, user[0].password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
    // Generate a JWT token with the user ID
    const token = jwt.sign(
      { userID: user[0].userID }, // payload with userID
      JWT_SECRET, // Secret key
      { expiresIn: "2h" } // Token expiration time
    );

    return NextResponse.json(
      {
        message: "Login successful",
        userID: user[0].userID,
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ROUTE_SIGNIN] Error during sign-in:", error);
    return NextResponse.json(
      { message: "An error occurred during sign-in" },
      { status: 500 }
    );
  }
}
