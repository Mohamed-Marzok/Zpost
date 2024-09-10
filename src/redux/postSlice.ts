import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceAxios } from "../config";
import { Post } from "../interfaces";
import { getPosts } from "./postsSlice";

interface PostsResponse {
  data: Post;
}

interface PostsState {
  post: Post;
}
interface IpostData {
  title: string;
  body: string;
  image: FileList;
}
// Fetching posts
export const getPost = createAsyncThunk<PostsResponse, number>(
  "post/getPost",
  async (postId: number) => {
    const response = await instanceAxios(`/posts/${postId}`);
    console.log(response);
    return response.data;
  }
);
// add posts
export const addPost = createAsyncThunk<PostsResponse, IpostData>(
  "post/addPost",
  async (postData: IpostData, { dispatch }) => {
    const postFormData = new FormData();
    postFormData.append("title", postData.title);
    postFormData.append("body", postData.body);
    postFormData.append("image", postData.image[0]);

    const response = await instanceAxios.post(`/posts`, postFormData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch(getPosts(1));
    console.log(response);
    return response.data;
  }
);
// delete post
export const deletePost = createAsyncThunk<PostsResponse, number>(
  "post/deletePost",
  async (postId: number, { dispatch }) => {
    const response = await instanceAxios.delete(`/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch(getPosts(1));
    console.log(response);
    return response.data;
  }
);

// Posts slice
export const postSlice = createSlice({
  name: "post",
  initialState: {
    post: {},
  } as PostsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.post = action.payload.data;
    });
  },
});

export default postSlice.reducer;
