import { createSlice } from "@reduxjs/toolkit";

export const steperSlice = createSlice({
  name: "stepper",
  initialState: {
    Signupstepper: false,
    VerifyOtpstepper: false,
    ForgetPasswordstepper: false,
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
  },
});

export const {
  setSignupstepper,
  setVerifyOtpstepper,
  setForgetPasswordstepper,
} = steperSlice.actions;

export default steperSlice.reducer;
