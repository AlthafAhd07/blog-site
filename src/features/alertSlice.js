import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  toast: {
    visible: false,
    msg: "",
    type: "",
  },
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    changeLoadingState: (state, action) => {
      state.loading = action.payload;
    },
    showToast: (state, action) => {
      state.toast = { ...state.toast, ...action.payload };
    },
    showErrMsg: (state, action) => {
      state.toast = {
        ...state.toast,
        visible: true,
        type: "err",
        msg: action.payload,
      };
    },
    showSuccessMsg: (state, action) => {
      state.toast = {
        ...state.toast,
        visible: true,
        type: "success",
        msg: action.payload,
      };
    },
  },
});

export const selectAlert = (state) => state.alert;

export const { changeLoadingState, showToast, showErrMsg, showSuccessMsg } =
  alertSlice.actions;

export default alertSlice.reducer;
