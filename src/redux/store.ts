import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";
import postReducer from "./postSlice";
import commentReducer from "./commentsSlice";
import userReducer from "./userSlice";
import uiReducer from "./uiSlice";

// Configure the store
const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    post: postReducer,
    comment: commentReducer,
    ui: uiReducer,
  },
});

export type TState = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;

export default store;
