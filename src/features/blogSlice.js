import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBlogs: null,
  userBlogs: null,
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
      state.allBlogs.unshift(action.payload);
      console.log(action.payload);
    },

    deleteSinglePost: (state, action) => {
      state.allBlogs = state.allBlogs.filter(
        (item) => item._id !== action.payload
      );
      state.userBlogs = state.userBlogs.filter(
        (item) => item._id !== action.payload
      );
    },

    updateSingleBlog: (state, action) => {
      state.allBlogs = state.allBlogs.map((item) => {
        if (item._id === action.payload.id) {
          return { ...item, ...action.payload };
        } else {
          return item;
        }
      });
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
  updateSingleBlog,
} = blogSlice.actions;

export default blogSlice.reducer;
