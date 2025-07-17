export interface CreateArticleDto {
  title: string;
  body: string;
}
export interface UpdateArticleDto {
  title?: string;
  body?: string;
}

export interface RegisterUserDto {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
}

export interface CreateCommentDto {
  text: string;
  articleId: number;
}

export interface UpdateCommentDto {
  text?: string;
}
