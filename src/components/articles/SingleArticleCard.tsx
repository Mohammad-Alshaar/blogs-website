import { SingleArticle } from "@/utils/type";

interface CardProps {
  article: SingleArticle;
}
export default function SingleArticleCard({ article }: CardProps) {
  return (
    <div
      className=" shadow-md p-6 w-full relative"
      style={{ backgroundColor: "#d2ccb6" }}
    >
      <strong className="absolute right-10">
        {new Date(article.createdAt).toDateString()}
      </strong>
      <h2 className="text-xl font-semibold mt-10 text-yellow-950 mb-2">
        {article.title}
      </h2>
      <p className="mb-4">{article.body}</p>
    </div>
  );
}
