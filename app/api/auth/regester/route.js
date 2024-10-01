import { NextResponse } from "next/server";
import { connectDB } from "../../../mongodb/index";
import User from "../../../models/User";
import { hash } from "bcryptjs";
import axios from "axios";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { Generate_Token } from "../../../utils/functions";
/**
 * @method POST
 * @route http://localhost:3000/api/auth/regester
 * @description Register a new user
 * @access public
 */
export const POST = async (req) => {
  try {
    await connectDB();
    const body = await req.json();
    const { username, email, password } = body;
    const response = await axios.get(
      `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${process.env.NEXT_PUBLIC_EMAIL_VEREFICATION_API_KEY}`
    );
    if (response.data.data.status === "invalid")
      return NextResponse.json(
        {
          message: "invalid email",
        },
        {
          status: 400,
        }
      );

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
    const Stored_USER = await User.findOne({ email: email });
    console.log(Stored_USER);
    const User_Token = {
      id: Stored_USER._id,
      username: Stored_USER.username,
      email: Stored_USER.email,
    };

    const cookie = Generate_Token(User_Token);
    return NextResponse.json(
      { message: "User registered successfully" },
      {
        headers: { "Set-Cookie": cookie },
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error during user registration:", error);
    return NextResponse.json(
      { message: "Failed to create user", error: error.message },
      { status: 500 }
    );
  }
};
