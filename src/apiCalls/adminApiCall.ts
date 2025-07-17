import { DOMAIN } from "@/utils/constants";
import { Comment } from "@prisma/client";

export async function getAllComments(myCookie: string): Promise<Comment[]> {
  const response = await fetch(`${DOMAIN}/api/comments`, {
    headers: {
      Cookie: `jsonwebtoken=${myCookie}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch comments");
  return response.json();
}
