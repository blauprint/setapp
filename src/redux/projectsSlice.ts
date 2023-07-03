import { AnyAction, PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { ProjectData } from '@/types/typedefs';
import { current } from '@reduxjs/toolkit';

const initialState: ProjectData[] = [];

export const projectsSlice: Slice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    // add: (state: ProjectData[], action: PayloadAction<ProjectData[]>) => {
    getAllProjects: (state: ProjectData[]) => {
      return state;
    },
    addProjects: (state: ProjectData[], action: AnyAction) => {
      // state = [...state, action.payload];
      // return state;
      state.push(...action.payload);
    },
    addNewProject: (state: ProjectData[], action: AnyAction) => {
      // state = [...state, action.payload];
      // return state;
      state.push(action.payload);
    },

    deleteProjectFromStore: (state: ProjectData[], action: AnyAction) => {
      // console.log(current(state));

      // const idx = state.findIndex((project) => project.id === action.payload);

      // if (idx !== -1) {
      //   state.splice(idx, 1);
      // }
      // console.log(current(state));
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
export const selectProject = (state: RootState) => state.projects;
export default projectsSlice.reducer;
