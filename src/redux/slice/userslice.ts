import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    userNumber: "",
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setuserNumber: (state, action) => {
      state.userNumber = action.payload;
    },
  },
});

export const { setToken, setuserNumber } = counterSlice.actions;

export default counterSlice.reducer;
