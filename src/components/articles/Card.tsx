// import { Article } from "@/utils/type";
import { Article } from "@prisma/client";
import Link from "next/link";
interface CardProps {
  article: Article;
}
export default function Card({ article }: CardProps) {
  return (
    <div
      className="shadow-md pt-7  w-full lg:w-1/4 flex flex-col justify-between"
      style={{ backgroundColor: "#d2ccb6" }}
    >
      <h2 className="text-xl ml-4 font-semibold text-yellow-900 mb-2 line-clamp-1">
        {article.title}
      </h2>
      <p className="text-yellow-950 ml-4 mb-4 line-clamp-1">{article.body}</p>
      <Link
        href={`/articles/${article.id}`}
        className="inline-block px-4 py-2 text-center text-white transition"
        style={{ backgroundColor: "#938564" }}
      >
        Read More
      </Link>
    </div>
  );
}
