import { prisma } from "@/utils/db";
import { UpdateCommentDto } from "@/utils/dtos";
import { updateCommentSchema } from "@/utils/validationSchemas";
import { verifyToken } from "@/utils/verifyToken";
import { NextResponse, NextRequest } from "next/server";

interface Props {
  params: Promise<{ id: string }>;
}

/**
 * @method PUT
 * @route ~/api/comments/:id
 * @desc Update Comment
 * @access private (only owner of the comment)
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const id = (await params).id;
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
    });
    if (!comment) {
      return NextResponse.json(
        { message: "comment not found" },
        { status: 404 }
      );
    }
    const user = verifyToken(request);
    if (!user || user.id !== comment.userId) {
      return NextResponse.json(
        { message: "you are not allowed" },
        { status: 403 }
      );
    }
    const body = (await request.json()) as UpdateCommentDto;
    const validation = updateCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: JSON.parse(validation.error.message)[0].message },
        {
          status: 400,
        }
      );
    }
    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(id) },
      data: {
        text: body.text,
      },
    });
    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server Error,${error}` },
      { status: 500 }
    );
  }
}

/**
 * @method DELETE
 * @route ~/api/comments/:id
 * @desc DELETE Comment
 * @access private (only owner of the comment and admin)
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const id = (await params).id;
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
    });
    if (!comment) {
      return NextResponse.json(
        { message: "comment not found" },
        { status: 404 }
      );
    }
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "no token provided" },
        { status: 401 }
      );
    }
    if (user.id == comment.userId || user.isAdmin) {
      await prisma.comment.delete({ where: { id: parseInt(id) } });
      return NextResponse.json(
        { message: "comment has been deleted" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "you are not allowed" },
      { status: 403 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server Error,${error}` },
      { status: 500 }
    );
  }
}
