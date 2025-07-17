import { prisma } from "@/utils/db";
import { CreateCommentDto } from "@/utils/dtos";
import { createCommentSchema } from "@/utils/validationSchemas";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method POST
 * @route ~/api/comments
 * @desc create comment
 * @access private (only logged user)
 */

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "only logged in user can commented" },
        { status: 401 }
      );
    }
    const body = (await request.json()) as CreateCommentDto;
    const validation = createCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: JSON.parse(validation.error.message)[0].message },
        {
          status: 400,
        }
      );
    }
    const newComment = await prisma.comment.create({
      data: {
        text: body.text,
        articleId: body.articleId,
        userId: user.id,
      },
    });
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server Error,${error}` },
      { status: 500 }
    );
  }
}

/**
 * @method GET
 * @route ~/api/comments
 * @desc get all comment
 * @access private (only admin can get all comments)
 */

export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin can get comments" },
        { status: 403 }
      );
    }
    const comments = await prisma.comment.findMany();
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server Error,${error}` },
      { status: 500 }
    );
  }
}
