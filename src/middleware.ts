import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const jsonwebtoken = request.cookies.get("jsonwebtoken");
  const authToken = jsonwebtoken?.value as string;
  if (!authToken) {
    if (request.nextUrl.pathname.startsWith("/api/users/profile/:path*")) {
      return NextResponse.json(
        { message: "no token provided,message from middleware" },
        { status: 401 }
      );
    }
  } else {
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/api/users/profile/:path*", "/login", "/register"],
};
