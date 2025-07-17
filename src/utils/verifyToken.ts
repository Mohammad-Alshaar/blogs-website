import Jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { JWTPayload } from "./type";

export function verifyToken(request: NextRequest): JWTPayload | null {
  try {
    const jsonwebtoken = request.cookies.get("jsonwebtoken");
    const authToken = jsonwebtoken?.value as string;
    if (!authToken) return null;
    const privateKey = process.env.JWT_SECRET as string;
    const userTokenPayload = Jwt.verify(authToken, privateKey) as JWTPayload;
    return userTokenPayload;
  } catch (error) {
    return null;
  }
}

export function verifyTokenForPage(token: string): JWTPayload | null {
  try {
    const privateKey = process.env.JWT_SECRET as string;
    const userTokenPayload = Jwt.verify(token, privateKey) as JWTPayload;
    if (!userTokenPayload) return null;
    return userTokenPayload;
  } catch (error) {
    return null;
  }
}
