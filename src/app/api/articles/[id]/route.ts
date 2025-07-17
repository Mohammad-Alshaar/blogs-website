import { NextRequest, NextResponse } from "next/server";
import { UpdateArticleDto } from "@/utils/dtos";
import { prisma } from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

interface Props {
  params: Promise<{ id: string }>;
}

/**
 * @method GET
 * @route ~/api/articles/:id
 * @desc Get Single Article By Id
 * @access public
 */

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const id = (await params).id;
    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
      include: {
        comments: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server Error,${error}` },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @route ~/api/articles/:id
 * @desc Update Article
 * @access private (only admin can update article)
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(request);
    if (!user || user.isAdmin == false) {
      return NextResponse.json(
        {
          message: "only admin can update article",
        },
        { status: 403 }
      );
    }
    const id = (await params).id;
    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
    });
    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 }
      );
    }
    const body = (await request.json()) as UpdateArticleDto;
    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        body: body.body,
      },
    });
    return NextResponse.json(updatedArticle, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server Error,${error}` },
      { status: 500 }
    );
  }
}

/**
 * @method DELETE
 * @route ~/api/articles/:id
 * @desc Delete Article
 * @access private (only admin can delete article)
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(request);
    if (!user || user.isAdmin == false) {
      return NextResponse.json(
        {
          message: "only admin can delete article",
        },
        { status: 403 }
      );
    }
    const id = (await params).id;
    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
      include: { comments: true },
    });
    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 }
      );
    }
    await prisma.article.delete({ where: { id: parseInt(id) } });
    //delete the comments that belong to this article
    const commentIds: number[] = article?.comments.map((comment) => comment.id);
    await prisma.comment.deleteMany({
      where: { id: { in: commentIds } },
    });
    return NextResponse.json({ message: "article deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server Error,${error}` },
      { status: 500 }
    );
  }
}
