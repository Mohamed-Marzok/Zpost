import { createSlice } from "@reduxjs/toolkit";

interface IState {
  sideBar: boolean;
}
export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    sideBar: false,
  } as IState,
  reducers: {
    openSideBar: (state) => {
      state.sideBar = true;
    },
    closeSideBar: (state) => {
      state.sideBar = false;
    },
    toggleSideBar: (state) => {
      state.sideBar = !state.sideBar;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openSideBar, closeSideBar, toggleSideBar } = uiSlice.actions;

export default uiSlice.reducer;
