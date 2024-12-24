import { createSlice } from "@reduxjs/toolkit";

export const steperSlice = createSlice({
  name: "stepper",
  initialState: {
    Signupstepper: false,
  },
  reducers: {
    setSignupstepper: (state, action) => {
      state.Signupstepper = action.payload;
    },
  },
});

export const { setSignupstepper } = steperSlice.actions;

export default steperSlice.reducer;
