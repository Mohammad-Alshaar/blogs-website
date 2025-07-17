import { getArticles, getArticlesCount } from "@/apiCalls/articleApiCall";
import Card from "@/components/articles/Card";
import SearchInput from "@/components/articles/SearchInput";
import Pagination from "@/components/Pagination";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
// import { Article } from "@/utils/type";
import { Article } from "@prisma/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
  description: "Articles Page",
};
interface ArticlesPageProps {
  searchParams: Promise<{ pageNumber: string }>;
}

export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  const pageNumber = (await searchParams).pageNumber;

  const articles: Article[] = await getArticles(pageNumber);
  const count: number = await getArticlesCount();
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);
  return (
    <div>
      <SearchInput />
      <div className="pt-20 pb-30 flex justify-center items-center flex-col text-center gap-4 text-yellow-950">
        <p className="md:text-5xl text-3xl w-1/2">
          Adventures, Stories & Insights Await
        </p>
        <p>
          Welcome to the heart of my blog, where stories of exploration,
          innovation, and personal growth come to life.
        </p>
      </div>
      <div className="flex justify-center flex-col md:flex-row  items-center gap-8 flex-wrap m-7">
        {articles.map((article) => {
          return <Card key={article.id} article={article} />;
        })}
      </div>
      <Pagination
        pageNumber={parseInt(pageNumber)}
        route="/articles"
        pages={pages}
      />
    </div>
  );
}
