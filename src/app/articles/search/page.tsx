import { getArticlesBasedOnSearch } from "@/apiCalls/articleApiCall";
import Card from "@/components/articles/Card";
import { Article } from "@prisma/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
  description: "Articles Page",
};

interface ArticleSearchPageProps {
  searchParams: Promise<{ searchText: string }>;
}

export default async function ArticlesSearchPage({
  searchParams,
}: ArticleSearchPageProps) {
  const searchText = (await searchParams).searchText;
  const articles: Article[] = await getArticlesBasedOnSearch(searchText);
  return (
    <>
      {articles.length === 0 ? (
        <h1>Articles based on {searchText} not found</h1>
      ) : (
        <div className="flex justify-center  items-center gap-8 flex-wrap m-7">
          {" "}
          <strong className="text-4xl">Articles Based On: {searchText}</strong>
          <div className="flex gap-4 flex-wrap justify-center m-7">
            {articles.map((article) => {
              return <Card key={article.id} article={article} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}
