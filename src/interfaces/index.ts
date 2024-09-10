export interface ILoginInput {
  lable: string;
  name: "username" | "password";
}
export interface ISignupInput {
  lable: string;
  name: "email" | "password" | "firstname" | "lastname" | "confirmPassword";
}
export interface IAddPostInput {
  lable: string;
  name: "title" | "body" | "image";
  type: string;
}
// Define the Post interface
export interface Author {
  id: number;
  profile_image: string;
  username: string;
  name: string;
  email: string | null;
  email_verified_at: string | null;
  remember_token: string | null;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: number;
  body: string;
  author: Author;
}

export interface Post {
  id: number;
  title: string | null;
  body: string;
  author: Author;
  image: string;
  tags: string[];
  created_at: string;
  comments_count: number;
  comments: Comment[];
}
