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
  },
});

export const selectAuth = (state) => state.authUser;

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
