import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";
import postReducer from "./postSlice";
import userReducer from "./UserSlice";

// Configure the store
const store = configureStore({
  reducer: {
    posts: postsReducer,
    post: postReducer,
    user: userReducer,
  },
});

export type TState = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;

export default store;
