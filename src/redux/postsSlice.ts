import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceAxios } from "../config";
import { Post } from "../interfaces";

// Define types for Post, Author, Links, Meta, and the overall API response
// interface Author {
//   id: number;
//   username: string;
//   name: string;
//   email: string;
//   profile_image: object;
//   is_fake: number;
//   created_at: string;
//   updated_at: string;
// }

interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

interface PostsResponse {
  data: Post[];
  links: Links;
  meta: Meta;
}

interface PostsState {
  posts: Post[];
  links: Links | null;
  meta: Meta | null;
}

// Fetching posts
export const getPosts = createAsyncThunk<PostsResponse, number>(
  "posts/getPosts",
  async (currentPage: number) => {
    const response = await instanceAxios(`/posts?limit=5&page=${currentPage}`);
    console.log(response);
    return response.data;
  }
);

// Posts slice
export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    links: null,
    meta: null,
  } as PostsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload.data;
      state.links = action.payload.links;
      state.meta = action.payload.meta;
    });
  },
});

export default postsSlice.reducer;
