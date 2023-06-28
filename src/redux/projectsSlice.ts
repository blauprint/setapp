import { PayloadAction, createSlice, AnyAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

import { Project } from "@/types/Project";
import { ProjectData } from "@/types/typedefs";

const initialState: Project[] = [];

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    add: (state: ProjectData, action: AnyAction) => {
      state.push(action.payload);
      return state;
    },
  },
});

export const { add } = projectsSlice.actions;
export const selectProject = (state: RootState) => state.projects;
export default projectsSlice.reducer;
