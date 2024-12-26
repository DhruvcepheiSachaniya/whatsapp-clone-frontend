import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userslice";
import stepperReducer from "../slice/stepper";

const store = configureStore({
  reducer: {
    user: userReducer,
    stepper: stepperReducer,
  },
});

// Export the store for usage
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
