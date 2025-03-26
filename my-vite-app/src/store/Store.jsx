import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./slices/CounterSlice";
import stackReducer from "./slices/StackSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    stack: stackReducer,
  },
});
