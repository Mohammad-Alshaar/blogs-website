import * as z from "zod";
export const createArticleSchema = z.object({
  title: z.string().min(2, "title must be at lest two char").max(200),
  body: z.string().min(10).max(2000),
});

export const registerSchema = z.object({
  username: z.string().min(2).max(100),
  email: z.string().min(3).max(200),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().min(3).max(200),
  password: z.string().min(6),
});

export const UpdateProfileSchema = z.object({
  username: z.string().min(2).max(100).optional(),
  email: z.string().min(3).max(200).optional(),
  password: z.string().min(6).optional(),
});

export const createCommentSchema = z.object({
  text: z.string().min(2).max(500),
  articleId: z.number(),
});
export const updateCommentSchema = z.object({
  text: z.string().min(2).max(500).optional(),
});
