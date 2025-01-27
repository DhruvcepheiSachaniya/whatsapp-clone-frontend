import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    userNumber: "",
    contactList: [],
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setuserNumber: (state, action) => {
      state.userNumber = action.payload;
    },
    setcontactList: (state, action) => {
      state.contactList = action.payload;
    },
    clearStorage: (state) => {
      // Reset state to initial values
      state.token = "";
      state.userNumber = "";
      state.contactList = [];
    },
  },
});

export const { setToken, setuserNumber, setcontactList, clearStorage } =
  counterSlice.actions;

export default counterSlice.reducer;
