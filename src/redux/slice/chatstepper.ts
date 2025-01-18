import { createSlice } from "@reduxjs/toolkit";

export const ChatSlice = createSlice({
  name: "chat",
  initialState: {
    soket: "",
    currentUserSocketId: "",
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
  },
});

export const { setsoket, setcurrentUserSocketId, setonlineUsers } =
  ChatSlice.actions;

export default ChatSlice.reducer;
