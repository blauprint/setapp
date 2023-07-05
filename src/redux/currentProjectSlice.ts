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
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.backend.todoList = state.backend.todoList.filter((todo) => todo.id !== action.payload);
      state.frontend.todoList = state.frontend.todoList.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action: PayloadAction<{id: string, title: string, done: boolean}>) => {
      const { id, title, done } = action.payload;
      const todo = state.backend.todoList.find((todo) => todo.id === id) || state.frontend.todoList.find((todo) => todo.id === id);
      if (todo) {
        todo.title = title;
        todo.done = done;
      }
    },
    changeTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
      return state;
    }
  },
});

export const { addCurrentProject, deleteTodo, updateTodo, changeTitle } = currentProjectSlice.actions;
export const selectAllProjects = (state: RootState) => state.projects;
export default currentProjectSlice.reducer;
