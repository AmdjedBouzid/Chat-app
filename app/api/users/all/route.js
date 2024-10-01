import { NextResponse } from "next/server";
import { connectDB } from "../../../mongodb/index";
import { Get_User } from "../../../utils/functions";
import User from "../../../models/User";

/**
 * @method GET
 * @route http://localhost:3000/api/users/all
 * @description Get all users
 * @access public
 */
export const GET = async (req) => {
  try {
    await connectDB();

    const ALL_USERS = await User.find({});

    console.log(ALL_USERS);

    return NextResponse.json({
      message: "Users fetched successfully",
      users: ALL_USERS,
    });
  } catch (error) {
    console.error("Error fetching users:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch users",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
