import { createSlice } from "@reduxjs/toolkit";

export const ChatSlice = createSlice({
  name: "chat",
  initialState: {
    soket: null,
    currentUserSocketId: "",
    currentUserPhotoUrl: "",
    currentUserUserName: "",
    onlineUsers: [],
  },
  reducers: {
    setsoket: (state, action) => {
      state.soket = action.payload;
    },
    setcurrentUserSocketId: (state, action) => {
      state.currentUserSocketId = action.payload;
    },
    setonlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setcurrentUserPhotoUrl: (state, action) => {
      state.currentUserPhotoUrl = action.payload;
    },
    setcurrentUserUserName: (state, action) => {
      state.currentUserUserName = action.payload;
    },
  },
});

export const {
  setsoket,
  setcurrentUserSocketId,
  setonlineUsers,
  setcurrentUserPhotoUrl,
  setcurrentUserUserName,
} = ChatSlice.actions;

export default ChatSlice.reducer;
