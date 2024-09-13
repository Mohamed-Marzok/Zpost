import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceAxios } from "../config";
import { Post } from "../interfaces";

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
  isLoading: boolean;
  error: boolean;
}

// Fetching posts
export const getPosts = createAsyncThunk<PostsResponse, number>(
  "posts/getPosts",
  async (currentPage: number) => {
    const response = await instanceAxios(`/posts?limit=15&page=${currentPage}`);
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
    isLoading: false,
    error: false,
  } as PostsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload.data;
        state.links = action.payload.links;
        state.meta = action.payload.meta;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getPosts.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default postsSlice.reducer;
