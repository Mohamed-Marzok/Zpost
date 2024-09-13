import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceAxios } from "../config";

// Interface for the login/signup request payload
interface UserCredentials {
  username: string;
  password: string;
}
interface UserSign {
  password: string;
  email: string;
  name: string;
  image: FileList | undefined;
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
  openLoginAlert: boolean; // Fixing the typo from `openLoginAleart` to `openLoginAlert`
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
  async (userData: UserSign) => {
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("username", userData.email);
    formData.append("password", userData.password);
    if (userData.image && userData.image.length > 0) {
      formData.append("image", userData.image[0]);
    }
    try {
      const response = await instanceAxios.post(`/register`, formData);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// User slice
export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token"),
    openLoginAlert: false,
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
  reducers: {
    closeLoginAlert: (state) => {
      state.openLoginAlert = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.openLoginAlert = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      });
  },
});

// Export the closeLoginAlert action
export const { closeLoginAlert } = userSlice.actions;

export default userSlice.reducer;
