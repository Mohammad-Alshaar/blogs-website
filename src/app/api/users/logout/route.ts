import { NextRequest, NextResponse } from "next/server";
/**
 * @method POST
 * @route ~/api/users/logout
 * @desc Logout user
 * @access public
 */

export function POST(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: "You are logout" },
      { status: 200 }
    );
    response.cookies.set("jsonwebtoken", "", {
      path: "/",
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server Error,${error}` },
      { status: 500 }
    );
  }
}
