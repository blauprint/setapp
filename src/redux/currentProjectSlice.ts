import { AnyAction, PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

import { ProjectData } from "@/types/typedefs";

const initialState: ProjectData = {
  idea: '',
  projectName: '',
  toDoList: [],
  frontend: {
    framework: {
      name: '',
      whyGoodOption: '',
      description: '',
      link: ''
    },
    colorScheme: {
      whyGoodOption: '',
      colorPalette: []
    },
  },

  backend: {
    framework: {
      name: '',
      whyGoodOption: '',
      description: '',
      link: ''
    },
    database: "",
  },
  notes: '',
  createdAt: 0
}


export const currentProjectSlice: Slice = createSlice({
  name: 'currentProject',
  initialState,
  reducers: {
    addCurrentProject: (state: ProjectData, action: PayloadAction<ProjectData>) => {
      // addCurrentProject: (state: ProjectData, action: AnyAction) => {
      // state = [...state, action.payload];
      // return state;
      // state.push(action.payload);
      return action.payload
    },
  },
});

export const { addCurrentProject } = currentProjectSlice.actions;
export const selectProject = (state: RootState) => state.projects;
export default currentProjectSlice.reducer;
