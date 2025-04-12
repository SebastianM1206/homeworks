import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth/authSlice";
import firebaseReducer from "./slices/FirebaseSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    firebase: firebaseReducer,
  },
});
