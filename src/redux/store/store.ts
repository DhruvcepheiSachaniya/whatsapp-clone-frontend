import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../slice/userslice";
import stepperReducer from "../slice/stepper";

// Persist configuration for the user slice
const userPersistConfig = {
  key: "user",
  storage,
};

// Wrapping the user reducer with persistReducer
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer, // Persisted
    stepper: stepperReducer, // Not persisted
  },
});

// Create the persistor
export const persistor = persistStore(store);

// Export the store for usage
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
