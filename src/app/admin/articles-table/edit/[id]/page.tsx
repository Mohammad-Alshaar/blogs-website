import { getSingleArticle } from "@/apiCalls/articleApiCall";
import EditArticleForm from "@/components/forms/EditArticleForm";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { Article } from "@prisma/client";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Article",
  description: "Edit Article page",
};

interface EditArticlePageProps {
  params: Promise<{ id: string }>;
}
export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  const id = (await params).id;
  const cookieStore = await cookies();
  const myCookie = cookieStore.get("jsonwebtoken")?.value || "";
  if (!myCookie) {
    redirect("/");
  }
  const payload = verifyTokenForPage(myCookie);
  if (payload?.isAdmin === false) redirect("/");

  const article: Article = await getSingleArticle(id);
  return <EditArticleForm article={article} />;
}
