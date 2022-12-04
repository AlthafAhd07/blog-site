import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  access_token: "",
};

const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
    },
    logout: (state) => {
      state.user = "";
      state.access_token = "";
    },
    updateUserData: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const selectAuth = (state) => state.authUser;

export const { login, logout, updateUserData } = authSlice.actions;

export default authSlice.reducer;
