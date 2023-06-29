import { AnyAction, PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

import { ProjectData } from "@/types/typedefs";

const initialState: ProjectData[] = [];

export const projectsSlice: Slice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // add: (state: ProjectData[], action: PayloadAction<ProjectData[]>) => {
    addProjects: (state: ProjectData[], action: AnyAction) => {
      // state = [...state, action.payload];
      // return state;
      state.push(action.payload);
    },
  },
});

export const { addProjects } = projectsSlice.actions;
export const selectProject = (state: RootState) => state.projects;
export default projectsSlice.reducer;
