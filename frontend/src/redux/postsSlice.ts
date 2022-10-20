import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { Post } from "../types";

const initialState: Post[] = [];

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postsSet: (state, action: PayloadAction<Post[]>) => {
      return action.payload;
    },
    postAdded: (state, action: PayloadAction<Post>) => {
      state.push(action.payload);
    },
  },
});

export const { postsSet, postAdded } = postsSlice.actions;
export const selectPosts = (state: RootState) => state.posts;
export default postsSlice.reducer;
