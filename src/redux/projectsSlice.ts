import { AnyAction, Slice, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { ProjectData } from '@/types/typedefs';

const initialState: ProjectData[] = [];

export const projectsSlice: Slice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProjects: (state: ProjectData[], action: AnyAction) => {
      return [...action.payload];
    },
    addNewProject: (state: ProjectData[], action: AnyAction) => {
      state.push(action.payload);
    },

    deleteProjectFromStore: (state: ProjectData[], action: AnyAction) => {
      return state.filter((project) => project.id !== action.payload);
    },
  },
});

export const {
  addProjects,
  addNewProject,
  deleteProjectFromStore,
  getAllProjects,
} = projectsSlice.actions;
export const selectAllProjects = (state: RootState) => state.projects;
export const selectSingleProject = (state: RootState) => state.currentProject;
export default projectsSlice.reducer;
