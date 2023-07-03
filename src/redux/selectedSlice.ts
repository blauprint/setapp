import { AnyAction, Slice, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const selectedSlice: Slice = createSlice({
  name: 'selected',
  initialState: 'overview',
  reducers: {
    addSelected: (state: string, action: AnyAction) => {
      return action.payload;
    },
  },
});

export const { addSelected } = selectedSlice.actions;
export const selectSelected = (state: RootState) => state.selected;
export default selectedSlice.reducer;