import { NextRequest, NextResponse } from "next/server";
import { CreateArticleDto } from "@/utils/dtos";
import { createArticleSchema } from "@/utils/validationSchemas";
import { Article } from "@prisma/client";
import { prisma } from "@/utils/db";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { verifyToken } from "@/utils/verifyToken";

/**
 * @method GET
 * @route ~/api/articles
 * @desc Get Articles By page Number
 * @access public
 */
export async function GET(request: NextRequest) {
  try {
    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";

    const articles = await prisma.article.findMany({
      skip: ARTICLE_PER_PAGE * (parseInt(pageNumber) - 1),
      take: ARTICLE_PER_PAGE,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server Error,${error}` },
      { status: 500 }
    );
  }
}

/**
 * @method POST
 * @route ~/api/articles
 * @desc Create New Article
 * @access private (only admin can create article)
 */

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user || user.isAdmin == false) {
      return NextResponse.json(
        {
          message: "only admin can post article",
        },
        { status: 403 }
      );
    }
    const body = (await request.json()) as CreateArticleDto;

    const validation = createArticleSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: JSON.parse(validation.error.message)[0].message },
        {
          status: 400,
        }
      );
    }
    const newArticle: Article = await prisma.article.create({
      data: {
        title: body.title,
        body: body.body,
      },
    });
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server Error,${error}` },
      { status: 500 }
    );
  }
}
