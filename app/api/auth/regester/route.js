import { NextResponse } from "next/server";
import { connectDB } from "../../../mongodb/index";
import User from "../../../models/User";
import { hash } from "bcryptjs";

/**
 * @method POST
 * @route http://localhost:3000/api/auth/register
 * @description Register a new user
 * @access public
 */
export const POST = async (req) => {
  try {
    await connectDB();
    const body = await req.json();
    const { username, email, password } = body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const saltRounds = parseInt(process.env.NEXT_PUBLIC_SALT_NUMBER, 10);
    const hashedPassword = await hash(password, saltRounds);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }
};
