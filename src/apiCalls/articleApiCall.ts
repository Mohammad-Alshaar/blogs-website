import { DOMAIN } from "@/utils/constants";
import { SingleArticle } from "@/utils/type";
import { Article } from "@prisma/client";

export async function getArticles(
  pageNumber: string | undefined
): Promise<Article[]> {
  const response = await fetch(
    `${DOMAIN}/api/articles?pageNumber=${pageNumber}`
  );
  if (!response.ok) throw new Error("Failed to fetch articles");
  //اذا كنت بعمل return ما بحتاج الawait
  return response.json();
}

//get articles count
export async function getArticlesCount(): Promise<number> {
  const response = await fetch(`${DOMAIN}/api/articles/count`);
  if (!response.ok) throw new Error("Failed to fetch articles count");

  const { count } = (await response.json()) as { count: number };
  return count;
}

export async function getArticlesBasedOnSearch(
  searchText: string
): Promise<Article[]> {
  const response = await fetch(
    `${DOMAIN}/api/articles/search?searchText=${searchText}`
  );
  if (!response.ok) throw new Error("Failed to fetch articles");
  //اذا كنت بعمل return ما بحتاج الawait
  return response.json();
}

export async function getSingleArticle(
  articleId: string
): Promise<SingleArticle> {
  const response = await fetch(`${DOMAIN}/api/articles/${articleId}`);
  if (!response.ok) throw new Error("Failed to fetch article");
  return response.json();
}
