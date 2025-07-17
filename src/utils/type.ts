import { Article, Comment, User } from "@prisma/client";

export interface JWTPayload {
  id: number;
  isAdmin: boolean;
  username: string;
}

export type CommentWithUser = Comment & { user: User };
export type SingleArticle = Article & { comments: CommentWithUser[] };
