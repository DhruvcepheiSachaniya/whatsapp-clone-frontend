import { createSlice } from "@reduxjs/toolkit";
// Define the User interface
interface User {
  UserName: string;
  UserPhotoUrl: string;
  MobileNumber: string;
  Email: string;
  Created_At: string;
}

// Define the state interface
interface UserState {
  token: string;
  userNumber: string;
  contactList: any[]; // Replace `any` with a proper type for contact list items
  userProfile: User | null; // Add user profile data to the state
}

// Define the initial state
const initialState: UserState = {
  token: "",
  userNumber: "",
  contactList: [],
  userProfile: null, // Initialize user profile as null
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
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
    setUserProfile: (state, action: PayloadAction<User>) => {
      state.userProfile = action.payload; // Update user profile data
    },
    clearStorage: (state) => {
      // Reset state to initial values
      state.token = "";
      state.userNumber = "";
      state.contactList = [];
    },
  },
});

export const {
  setToken,
  setuserNumber,
  setcontactList,
  setUserProfile,
  clearStorage,
} = counterSlice.actions;

export default counterSlice.reducer;
