import { NextResponse } from "next/server";
import { connectDB } from "../../../mongodb/index";
import { Get_User } from "../../../utils/functions";
import User from "../../../models/User";
/**
 * @method GET
 * @route http://localhost:3000/api/users/me
 * @description get curent  user
 * @access public
 */
export const GET = async (req) => {
  try {
    const Result = await Get_User(req);
    const USER_Token = Result.user;
    const email = USER_Token.email;
    console.log("email", email);
    await connectDB();
    const existingUser = await User.findOne({ email });
    console.log("exist User", existingUser);
    if (existingUser) {
      return NextResponse.json(
        {
          message: "user finded successfully",
          existingUser,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "user not found",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log("Error ", error);
    return NextResponse.json({ error: error });
  }
};
