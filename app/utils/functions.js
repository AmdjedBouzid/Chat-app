import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { SECRET_KEY } from "./constants";
import cookie from "cookie";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
export const Generate_Token = (user) => {
  const Token = jwt.sign(user, process.env.NEXT_PUBLIC_JWT_SECRET);
  const cookie = serialize("Token", Token, {
    httpOnly: false,
    secure: false, //process.env.NEXT_PUBLIC_NODE_ENV === "production", // Use secure cookies in production
    maxAge: 60 * 60 * 24 * 30, // 1 month
    sameSite: "strict",
    path: "/",
  });
  return cookie;
};

export async function Get_User(req) {
  const url = req.nextUrl;
  const pathname = url.pathname;
  if (
    !req ||
    (!req.headers && (pathname !== "/Regester" || pathname !== "/Login"))
  ) {
    console.error("Request or headers not found");
    throw new Error("Request or headers not found");
  }
  try {
    // Extract cookies from the request
    const cookies = cookie.parse(req.headers.get("cookie") || "");

    const token = cookies.Token;

    if (
      !token &&
      (pathname !== "/Regester" ||
        pathname !== "/Login" ||
        pathname !== "/api/users/logout")
    ) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }
    // console.log("token------------", token);
    // Verify the JWT
    const { payload: decodedUser } = await jwtVerify(token, SECRET_KEY);

    // console.log("Token:", token);
    // console.log("Decoded User:", decodedUser);

    return { user: decodedUser };
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { message: "Error verifying token" },
      { status: 401 }
    );
  }
}
