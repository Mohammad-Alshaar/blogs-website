import { getSingleArticle } from "@/apiCalls/articleApiCall";
import SingleArticleCard from "@/components/articles/SingleArticleCard";
import CommentInput from "@/components/comments/CommentInput";
import CommentItem from "@/components/comments/CommentItem";
import { SingleArticle } from "@/utils/type";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Articles",
  description: "Articles Page",
};
interface SingleArticlePageProps {
  params: Promise<{ id: string }>;
}
export default async function SingleArticlePage({
  params,
}: SingleArticlePageProps) {
  const cookieStore = await cookies();
  const myCookie = cookieStore.get("jsonwebtoken")?.value || "";
  const payload = verifyTokenForPage(myCookie);
  const id = (await params).id;
  const article: SingleArticle = await getSingleArticle(id);
  return (
    <div className="mt-20 mx-5">
      <div className="">
        <SingleArticleCard article={article} />
      </div>
      {myCookie ? (
        <CommentInput articleId={parseInt(id)} />
      ) : (
        <strong>For Commenting you should to login first</strong>
      )}
      {article.comments.map((comment) => {
        return (
          <CommentItem
            key={comment.id}
            comment={comment}
            userId={payload?.id}
          />
        );
      })}
    </div>
  );
}
