/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface UserState {
  name: string | null;
  username: string | null;
  token: string | null;
}

const initialState: UserState = {
  name: localStorage.getItem("name"),
  username: localStorage.getItem("username"),
  token: localStorage.getItem("token"),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userRefresh: (state) => {
      state.name = localStorage.getItem("name");
      state.username = localStorage.getItem("username");
      state.token = localStorage.getItem("token");
    },
    userLogout: (state) => {
      state.name = null;
      state.username = null;
      state.token = null;
    },
  },
});

export const { userRefresh, userLogout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
