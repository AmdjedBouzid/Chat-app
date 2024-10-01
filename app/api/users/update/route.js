import { connectDB } from "../../../mongodb";
import cookie from "cookie";
import { NextResponse } from "next/server";
import User from "../../../models/User";
import { SECRET_KEY } from "../../../utils/constants";
import { Get_User } from "../../../utils/functions";
/**
 * @method PUT
 * @route http://localhost:3000/api/users/update
 * @description Update user information
 * @access public
 */
export const PUT = async (req) => {
  try {
    await connectDB();
    const body = await req.json();
    console.log(body);
    const Result = await Get_User(req);
    const USER = Result.user;
    console.log("user", USER);
    console.log("body", body);
    const updatedUser = await User.findByIdAndUpdate(USER.id, body, {
      new: true,
    });
    console.log("updatedUser", updatedUser);
    if (!updatedUser) {
      return NextResponse.json(
        { message: "user not found or not updated" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "User updated successfully", updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Failed to update user", error: error.message },
      { status: 500 }
    );
  }
};
