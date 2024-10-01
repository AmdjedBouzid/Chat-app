import { NextResponse } from "next/server";
import { connectDB } from "../../../mongodb/index";
import User from "../../../models/User";

/**
 * @method GET
 * @route http://localhost:3000/api/users/[name]
 * @description Search users by name
 * @access public
 */
export const GET = async (req, { params }) => {
  try {
    await connectDB();

    const { name } = params;

    const users = await User.find({
      username: { $regex: name, $options: "i" },
    });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
};
