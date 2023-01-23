import { createSlice } from "@reduxjs/toolkit";
import { IPhoto } from "shared/IPhoto";

interface IState {
  posts: IPhoto[];
  status: "loading" | "success" | "error" | "idle";
}

const initialState: IState = {
  posts: [],
  status: "idle",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded(state, action) {
      state.posts.push(action.payload);
      state.status = "success";
    },
    resetPosts(state) {
      state.posts = [];
      state.status = "idle";
    },
  },
});

export const { postAdded, resetPosts } = postsSlice.actions;

export default postsSlice.reducer;
