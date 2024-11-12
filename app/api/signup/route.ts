import { NextResponse } from "next/server";
import { hash } from "bcryptjs"; //For password hashing
import jwt from "jsonwebtoken"; // Import jsonwebtoken to generate a token
import { db } from "@/lib/db";
import {
  createNewUser,
  createNewStudent,
  createNewStaff,
} from "@prisma/client/sql";
import { Role } from "@/app/classes/User";
import User from "@/app/classes/User";

const JWT_SECRET = process.env.JWT_SECRET_KEY || "secret";

export async function POST(req: Request) {
  const { broncoID, firstName, lastName, email, username, password } =
    await req.json();

  // Validation check (you can improve this further)
  if (
    !broncoID ||
    !firstName ||
    !lastName ||
    !email ||
    !username ||
    !password
  ) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    // Hash the password
    const hashedPassword = await hash(password, 10);

    // console.log("Hashed Password:", hashedPassword);
    // console.log("Username:", username);
    // console.log("First Name:", firstName);
    // console.log("Last Name:", lastName);
    // console.log("Email:", email);
    const role: Role = broncoID.startsWith("S") ? Role.STUDENT : Role.STAFF;

    const newUser = await User.createNewUser(
      firstName,
      lastName,
      username,
      hashedPassword,
      email,
      role
    );

    if (!newUser) {
      return NextResponse.json(
        { message: "An error occurred during sign-up" },
        { status: 500 }
      );
    }

    // Generate a JWT token with the user ID
    const token = jwt.sign(
      { userID: newUser[0].userID }, // payload with userID
      JWT_SECRET, // Secret key
      { expiresIn: "2h" } // Token expiration time
    );

    // console.log("New User:", newUser);
    role == Role.STUDENT
      ? await db.$queryRawTyped(createNewStudent(broncoID, newUser[0].userID))
      : await db.$queryRawTyped(createNewStaff(broncoID, newUser[0].userID));

    return NextResponse.json(
      {
        message: "User created successfully",
        userID: newUser[0].userID,
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during sign-up:", error);
    return NextResponse.json(
      { message: "An error occurred during sign-up" },
      { status: 500 }
    );
  }
}
