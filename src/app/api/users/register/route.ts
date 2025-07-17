import { prisma } from "@/utils/db";
import { RegisterUserDto } from "@/utils/dtos";
import { registerSchema } from "@/utils/validationSchemas";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { setCookie } from "@/utils/generateToken";
import { JWTPayload } from "@/utils/type";
/**
 * @method POST
 * @route ~/api/users/register
 * @desc (register) create new user
 * @access public
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterUserDto;
    const validation = registerSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(
        { message: JSON.parse(validation.error.message)[0].message },
        {
          status: 400,
        }
      );
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (user) {
      return NextResponse.json(
        { message: "this user already registered" },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
      select: {
        username: true,
        id: true,
        isAdmin: true,
      },
    });
    const jwtPayload: JWTPayload = {
      id: newUser.id,
      username: newUser.username,
      isAdmin: newUser.isAdmin,
    };
    const cookie = setCookie(jwtPayload);
    return NextResponse.json(
      { ...newUser, message: "Registered & Authenticated" },
      { status: 201, headers: { "Set-Cookie": cookie } }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server Error,${error}` },
      { status: 500 }
    );
  }
}
