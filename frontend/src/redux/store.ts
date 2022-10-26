import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
