import { createSlice } from "@reduxjs/toolkit";

export const steperSlice = createSlice({
  name: "stepper",
  initialState: {
    Signupstepper: false,
    VerifyOtpstepper: false,
    ForgetPasswordstepper: false,
    SecurityCodestepper: false,
    AllowChangePassword: false,
    chatAreastepper: false,
  },
  reducers: {
    setSignupstepper: (state, action) => {
      state.Signupstepper = action.payload;
    },
    setVerifyOtpstepper: (state, action) => {
      state.VerifyOtpstepper = action.payload;
    },
    setForgetPasswordstepper: (state, action) => {
      state.ForgetPasswordstepper = action.payload;
    },
    setSecurityCodestepper: (state, action) => {
      state.SecurityCodestepper = action.payload;
    },
    setAllowChangePassword: (state, action) => {
      state.AllowChangePassword = action.payload;
    },
    setChatAreastepper: (state, action) => {
      state.chatAreastepper = action.payload;
    },
  },
});

export const {
  setSignupstepper,
  setVerifyOtpstepper,
  setForgetPasswordstepper,
  setSecurityCodestepper,
  setAllowChangePassword,
  setChatAreastepper,
} = steperSlice.actions;

export default steperSlice.reducer;
