import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBlogs: [],
  userBlogs: [],
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setAllBlogs: (state, action) => {
      state.allBlogs = action.payload;
    },
    setUserBlogs: (state, action) => {
      state.userBlogs = action.payload;
    },
    updateSingleUserBlog: (state, action) => {
      state.userBlogs = action.payload;
    },
    addNewBlog: (state, action) => {
      state.allBlogs.push(action.payload);
    },
    deleteSinglePost: (state, action) => {
      state.allBlogs = state.allBlogs.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const selectBlogs = (state) => state.blogs;

export const {
  setAllBlogs,
  setUserBlogs,
  updateSingleUserBlog,
  addNewBlog,
  deleteSinglePost,
} = blogSlice.actions;

export default blogSlice.reducer;
