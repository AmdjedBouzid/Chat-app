import { connectDB } from "../../../mongodb/index";
import User from "../../../models/User";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { Generate_Token } from "../../../utils/functions";
/**
 * @method POST
 * @route http://localhost:3000/api/auth/login
 * @description Login user
 * @access public
 */
export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json(); // Extract email and password from request body
    console.log({ email, password });
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // You can generate a JWT here and set it in the response cookies if needed]
    const Stored_USER = await User.findOne({ email: email });
    console.log(Stored_USER);
    const User_Token = {
      id: Stored_USER._id,
      username: Stored_USER.username,
      email: Stored_USER.email,
    };
    const cookie = Generate_Token(User_Token);
    console.log(cookie);
    return NextResponse.json(
      { message: "Login successful" },
      {
        headers: { "Set-Cookie": cookie },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Login failed", error: error.message },
      { status: 500 }
    );
  }
}
