import { createSlice } from "@reduxjs/toolkit";

export const stackSlice = createSlice({
  name: "stack",
  initialState: {
    items: [],
  },
  reducers: {
    push: (state, action) => {
      state.items.push(action.payload); //adding new item
    },
    pop: (state) => {
      if (state.items.length > 0) {
        state.items.pop(); //deleting las item
      }
    },
    isEmtpy: (state) => {
      //check if stack is empty
      return state.items.length === 0;
    },
    clear: (state) => {
      //clear stack
      state.items = [];
    },
    size: (state) => {
      //return size of stack
      return state.items.length;
    },
    getStack: (state) => {
      return state.items.slice().reverse();
    },
  },
});

export const { push, pop, clear } = stackSlice.actions;
export default stackSlice.reducer;
