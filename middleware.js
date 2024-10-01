import cookie from "cookie";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { Get_User } from "./app/utils/functions";
import { SECRET_KEY } from "./app/utils/constants";
export async function middleware(req) {
  const url = req.nextUrl;
  const pathname = url.pathname;

  console.log("Current route:", pathname);

  if (
    pathname === "/Regester" ||
    pathname === "/Login" ||
    pathname === "/api/auth/login" ||
    pathname === "/api/auth/regester"
  ) {
    const Result = await Get_User(req);
    const USER = Result.user;
    if (USER) {
      return NextResponse.json(
        { message: "you are already loged in" },
        { status: 200 }
      );
    }
  }
  if (
    pathname === "/api/users/me" ||
    pathname === "/api/users/update" ||
    pathname === "/Profile" ||
    pathname === "/Chats" ||
    pathname === "/Contacts"
  ) {
    const Result = await Get_User(req);
    const USER = Result.user;
    console.log("user____________", USER);
    if (!USER) {
      return NextResponse.json(
        { message: "no user authenticated " },
        { status: 404 }
      );
    }
  }
  if (pathname === "/api/users/logout") {
    const Result = await Get_User(req);
    const USER = Result.user;
    if (!USER) {
      return NextResponse.json(
        { message: "user arely loged out " },
        { status: 200 }
      );
    }
  }

  // console.log("Decoded User:-------------", USER);
  // return NextResponse.json({ message: "Invalid", USER });
}

export const config = {
  matcher: ["/api/users/:path*", "/:path*"], // Apply middleware to user-related routes
};
