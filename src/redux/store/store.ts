import { configureStore } from "@reduxjs/toolkit/react";
import userReducer from "../slice/userslice";
import stepperReducer from "../slice/stepper";

export default configureStore({
  reducer: {
    user: userReducer,
    stepper: stepperReducer,
  },
});
