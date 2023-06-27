import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

import { Project } from "@/types/Project";

const initialState: Project[] = [
  {
    id: 1,
    author: "Weronika",
    title: "WunderList",
    created_at: Date.now(),
    intro: "Task management app",
    techStacks: ["React", "Express"],
  },
  {
    id: 2,
    author: "German",
    title: "GameHunt",
    created_at: Date.now(),
    intro: "Game listing app",
    techStacks: ["Angular", "Koa"],
  },
];

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Project>) => {
      state = [...state, action.payload];
      return state;
    },
  },
});

export const { add } = projectSlice.actions;
export const selectProject = (state: RootState) => state.projects;
export default projectSlice.reducer;
