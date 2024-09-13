import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceAxios } from "../config";
import { Post } from "../interfaces";
import { getPosts } from "./postsSlice";

interface PostsResponse {
  data: Post;
}

interface PostsState {
  post: Post;
  isLoading: boolean;
}

interface IpostData {
  title: string;
  body: string;
  image?: FileList;
}

interface IPostsEdit {
  postId: number;
  postData: {
    title: string;
    body: string;
  };
}

// Fetching a single post
export const getPost = createAsyncThunk<PostsResponse, number>(
  "post/getPost",
  async (postId: number) => {
    const response = await instanceAxios(`/posts/${postId}`);
    console.log(response);
    return response.data;
  }
);

// Adding a new post
export const addPost = createAsyncThunk<PostsResponse, IpostData>(
  "post/addPost",
  async (postData: IpostData, { dispatch }) => {
    const postFormData = new FormData();
    postFormData.append("title", postData.title);
    postFormData.append("body", postData.body);
    if (postData.image && postData.image.length > 0) {
      postFormData.append("image", postData.image[0]);
    }

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

// Editing a post
export const editPost = createAsyncThunk<PostsResponse, IPostsEdit>(
  "post/editPost",
  async ({ postData, postId }, { dispatch }) => {
    const response = await instanceAxios.put(`/posts/${postId}`, postData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch(getPosts(1));
    console.log(response);
    return response.data;
  }
);

// Deleting a post
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
    isLoading: false, // Adding isLoading state
  } as PostsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getPost
      .addCase(getPost.pending, (state) => {
        state.isLoading = true; // Request is pending, set isLoading to true
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.isLoading = false; // Request is fulfilled, set isLoading to false
        state.post = action.payload.data;
      })
      .addCase(getPost.rejected, (state) => {
        state.isLoading = false; // Request failed, set isLoading to false
      })
      // Handle addPost
      .addCase(addPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPost.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addPost.rejected, (state) => {
        state.isLoading = false;
      })
      // Handle editPost
      .addCase(editPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editPost.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(editPost.rejected, (state) => {
        state.isLoading = false;
      })
      // Handle deletePost
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deletePost.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default postSlice.reducer;
