import { createSlice } from "@reduxjs/toolkit";

export const steperSlice = createSlice({
  name: "stepper",
  initialState: {
    Signupstepper: false,
    ForgetPasswordstepper: false,
  },
  reducers: {
    setSignupstepper: (state, action) => {
      state.Signupstepper = action.payload;
    },
    setForgetPasswordstepper: (state, action) => {
      state.ForgetPasswordstepper = action.payload;
    }
  },
});

export const { setSignupstepper } = steperSlice.actions;

export default steperSlice.reducer;
