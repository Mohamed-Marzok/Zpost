import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceAxios } from "../config";

// Interface for the login/signup request payload
interface UserCredentials {
  username: string;
  password: string;
  email?: string;
  name?: string;
}

// Interface for the user state
interface User {
  username: string;
  name: string;
  id: number;
  profile_image: string;
}

interface userState {
  token: string | null;
  user: User | null;
}

// Fetching login
export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (userData: UserCredentials) => {
    const response = await instanceAxios.post(`/login`, userData);
    console.log(response);
    return response.data;
  }
);

// Fetching signup
export const userSignup = createAsyncThunk(
  "user/userSignup",
  async (userData: UserCredentials) => {
    const response = await instanceAxios.post(`/register`, userData);
    console.log(response);
    return response.data;
  }
);

// User slice
export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token"),
    user: JSON.parse(
      localStorage.getItem("user") ||
        `{
      "username": "",
      "name": "",
      "id": 0,
      "profile_image": ""
    }`
    ),
  } as userState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user)); // JSON.stringify here
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user)); // JSON.stringify added here
      });
  },
});

export default userSlice.reducer;
