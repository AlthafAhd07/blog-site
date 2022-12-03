import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/authSlice";
import blogReducer from "../features/blogSlice";
import alertReducer from "../features/alertSlice";

export const store = configureStore({
  reducer: {
    authUser: authReducer,
    blogs: blogReducer,
    alert: alertReducer,
  },
});
