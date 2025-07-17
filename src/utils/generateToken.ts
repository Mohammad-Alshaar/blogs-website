import Jwt from "jsonwebtoken";
import { JWTPayload } from "./type";
import { serialize } from "cookie";
export function generateJWT(jwtPayload: JWTPayload): string {
  const privateKey = process.env.JWT_SECRET as string;
  //sign() => to make the token
  const token = Jwt.sign(jwtPayload, privateKey, {
    expiresIn: "30d",
  });
  return token;
}

//set cookie with jwt

export function setCookie(jwtPayload: JWTPayload): string {
  const token = generateJWT(jwtPayload);
  // this function make a cookie and put inside the token
  const cookie = serialize("jsonwebtoken", token, {
    //هذا بيعطي امان اكثر للكوكي لذلك ما حدا رح يقدر يعمل تعديل على الكوكي
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    //بيعطي امان اكتر للكوكي
    sameSite: "strict",
    //يعني كل الصفحات عندي رح تحصل على الكوكي
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return cookie;
}
