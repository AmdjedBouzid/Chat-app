import { NextResponse } from "next/server";

/**
 * @method POST
 * @route http://localhost:3000/api/users/logout
 * @description Delete cookie from the server side (logout example)
 * @access public
 */
export const POST = async (req) => {
  try {
    // Deleting the cookie by setting it with an empty value and max-age to 0
    const response = NextResponse.json({
      message: "Successfully logged out",
    });

    // Remove the cookie by setting its Max-Age to 0
    response.cookies.set("Token", "", {
      maxAge: 0, // This will immediately delete the cookie
      path: "/", // Define the path where the cookie is valid
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to delete cookie",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
