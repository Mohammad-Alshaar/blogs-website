import { prisma } from "@/utils/db";
import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateUserDto } from "@/utils/dtos";
import bcrypt from "bcryptjs";
import { UpdateProfileSchema } from "@/utils/validationSchemas";
interface Props {
  params: Promise<{ id: string }>;
}

/**
 * @method DELETE
 * @route ~/api/users/profile/:id
 * @desc Delete Profile
 * @access private (only user himself can delete his account)
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const id = (await params).id;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { comments: true },
    });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    // const jsonwebtoken = request.cookies.get("jsonwebtoken");
    // const authToken = jsonwebtoken?.value as string;

    //for decode token
    // const userPayloadFromToken = Jwt.verify(
    //   authToken,
    //   process.env.JWT_SECRET as string
    // ) as JWTPayload;

    //for decode token
    const userPayloadFromToken = verifyToken(request);

    if (userPayloadFromToken !== null && userPayloadFromToken.id === user.id) {
      await prisma.user.delete({ where: { id: parseInt(id) } });
      const commentIds: number[] = user?.comments.map((comment) => comment.id);
      await prisma.comment.deleteMany({ where: { id: { in: commentIds } } });
      return NextResponse.json(
        { message: "your profile (account) has been deleted" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "only user himself can delete his profile (account)" },
      { status: 403 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server Error,${error}` },
      { status: 500 }
    );
  }
}

/**
 * @method GET
 * @route ~/api/users/profile/:id
 * @desc GET Profile
 * @access private (only user himself can git his account)
 */

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const id = (await params).id;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        isAdmin: true,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    const userPayloadFromToken = verifyToken(request);
    if (userPayloadFromToken !== null && userPayloadFromToken.id === user.id) {
      return NextResponse.json(user, { status: 200 });
    }
    return NextResponse.json(
      { message: "you are not allowed,access denied" },
      { status: 403 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server Error,${error}` },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @route ~/api/users/profile/:id
 * @desc Update Profile
 * @access private (only user himself can update his account)
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const id = (await params).id;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        isAdmin: true,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    const userPayloadFromToken = verifyToken(request);
    if (userPayloadFromToken !== null && userPayloadFromToken.id === user.id) {
      const body = (await request.json()) as UpdateUserDto;
      const validation = UpdateProfileSchema.safeParse(body);
      if (!validation.success) {
        return NextResponse.json(
          { message: JSON.parse(validation.error.message)[0].message },
          {
            status: 400,
          }
        );
      }
      if (body.password) {
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(body.password, salt);
      }
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
          username: body.username,
          email: body.email,
          password: body.password,
        },
      });
      const { password, ...other } = updatedUser;
      return NextResponse.json({ ...other }, { status: 200 });
    }
    return NextResponse.json(
      { message: "you are not allowed,access denied" },
      { status: 403 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server Error,${error}` },
      { status: 500 }
    );
  }
}
