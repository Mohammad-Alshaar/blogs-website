import React from "react";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Article } from "@prisma/client";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { getArticles, getArticlesCount } from "@/apiCalls/articleApiCall";
import Pagination from "@/components/Pagination";
import ArticleTable from "@/components/admin/ArticleTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Article Table",
  description: "Admin dashboard Article Table",
};

interface ArticleTableProps {
  searchParams: Promise<{ pageNumber: string }>;
}
export default async function ArticlesTablePage({
  searchParams,
}: ArticleTableProps) {
  const pageNumber = (await searchParams).pageNumber;
  const cookieStore = await cookies();
  const myCookie = cookieStore.get("jsonwebtoken")?.value || "";
  if (!myCookie) {
    redirect("/");
  }
  const payload = verifyTokenForPage(myCookie);
  if (payload?.isAdmin === false) redirect("/");

  const articles: Article[] = await getArticles(pageNumber);
  const count: number = await getArticlesCount();
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);
  return (
    <div>
      <ArticleTable articles={articles} />
      <Pagination
        pageNumber={parseInt(pageNumber)}
        pages={pages}
        route="/admin/articles-table"
      />
    </div>
  );
}
