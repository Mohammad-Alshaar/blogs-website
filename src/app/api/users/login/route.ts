import { prisma } from "@/utils/db";
import { LoginUserDto } from "@/utils/dtos";
import { setCookie } from "@/utils/generateToken";
import { JWTPayload } from "@/utils/type";
import { loginSchema } from "@/utils/validationSchemas";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

/**
 * @method POST
 * @route ~/api/users/login
 * @desc (login) sign in
 * @access public
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginUserDto;
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: JSON.parse(validation.error.message)[0].message },
        {
          status: 400,
        }
      );
    }
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user) {
      return NextResponse.json(
        { message: "invalid email or password" },
        { status: 400 }
      );
    }
    const isPasswordMatch = await bcrypt.compare(body.password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "invalid email or password" },
        { status: 400 }
      );
    }
    const jwtPayload: JWTPayload = {
      id: user.id,
      isAdmin: user.isAdmin,
      username: user.username,
    };
    const cookie = setCookie(jwtPayload);
    return NextResponse.json(
      { message: "Authenticated" },
      { status: 200, headers: { "Set-Cookie": cookie } }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server Error,${error}` },
      { status: 500 }
    );
  }
}
