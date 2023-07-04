import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

import { ProjectData } from '@/types/typedefs';

const initialState: ProjectData = {
  id: '',
  summary: '',
  idea: '',
  title: '',
  frontend: {
    todoList: [],
    framework: {
      name: '',
      whyGoodOption: '',
      description: '',
      link: '',
    },
    colorScheme: {
      whyGoodOption: '',
      colorPalette: {
        colors: [],
      },
    },
  },
  backend: {
    todoList: [],
    framework: {
      name: '',
      whyGoodOption: '',
      description: '',
      link: '',
    },
    database: {
      name: '',
      whyGoodOption: '',
      description: '',
      link: '',
      schema: '',
    },
  },
  createdAt: 0,
};

export const currentProjectSlice: Slice = createSlice({
  name: 'currentProject',
  initialState,
  reducers: {
    addCurrentProject: (
      state: ProjectData,
      action: PayloadAction<ProjectData>,
    ) => {
      return action.payload;
    },
  },
});

export const { addCurrentProject } = currentProjectSlice.actions;
export const selectProject = (state: RootState) => state.projects;
export default currentProjectSlice.reducer;
