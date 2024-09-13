import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceAxios } from "../config";
import { getPost } from "./postSlice";

interface IAddCommentArgs {
  postId: number;
  commentText: { body: string };
}
// add comment
export const addComment = createAsyncThunk<void, IAddCommentArgs>(
  "post/getPost",
  async ({ postId, commentText }, { dispatch }) => {
    const response = await instanceAxios.post(
      `/posts/${postId}/comments`,
      commentText,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(getPost(postId));
    console.log(response);
  }
);

// Posts slice
export const commentsSlice = createSlice({
  name: "comments",
  initialState: {},
  reducers: {},
});

export default commentsSlice.reducer;
