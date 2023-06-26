import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    add: (state, action) => {
      [...state, action.payload];
    },
  },
});

export const { add } = projectSlice.actions;

export default projectSlice.reducer;
