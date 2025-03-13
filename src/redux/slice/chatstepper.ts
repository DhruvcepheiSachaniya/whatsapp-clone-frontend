import { createSlice } from "@reduxjs/toolkit";

export const ChatSlice = createSlice({
  name: "chat",
  initialState: {
    soket: null,
    currentUserSocketId: "",
    currentUserPhotoUrl: "",
    currentUserUserName: "",
    currentImgPreviewUrl: null,
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
    setcurrentImgPreviewUrl: (state, action) => {
      state.currentImgPreviewUrl = action.payload;
    },
  },
});

export const {
  setsoket,
  setcurrentUserSocketId,
  setonlineUsers,
  setcurrentUserPhotoUrl,
  setcurrentUserUserName,
  setcurrentImgPreviewUrl,
} = ChatSlice.actions;

export default ChatSlice.reducer;
