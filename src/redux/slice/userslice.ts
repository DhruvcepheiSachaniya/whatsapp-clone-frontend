import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = counterSlice.actions;

export default counterSlice.reducer;
