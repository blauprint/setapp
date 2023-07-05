import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { ProjectData, TodoItem } from '@/types/typedefs';
import { v4 as uuidv4 } from 'uuid';

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
    updateTodo: (state, action: PayloadAction<{ id: string, title: string, done: boolean }>) => {
      const { id, title, done } = action.payload;
      const todo = state.backend.todoList.find((todo) => todo.id === id) || state.frontend.todoList.find((todo) => todo.id === id);
      if (todo) {
        todo.id = id;
        todo.title = title;
        todo.done = done;
      }
    },
    updateNewTodo: (state, action: PayloadAction<{ id: string, title: string, done: boolean, uuid: string }>) => {
      const { uuid, id, title, done } = action.payload;
      const todo = state.backend.todoList.find((todo) => todo.id === uuid) || state.frontend.todoList.find((todo) => todo.id === uuid);
      if (todo) {
        todo.id = id;
        todo.title = title;
        todo.done = done;
      }
    },
    changeTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
      return state;
    },
    addFrontendTodo: (state, action: PayloadAction<{ title: string, createdAt: string, id: string, done: boolean }>) => {
      const date = new Date();
      action.payload.done = false;
      action.payload.createdAt = date.toString();
      state.frontend.todoList.push(action.payload)
    },
    addBackendTodo: (state, action: PayloadAction<TodoItem>) => {
      const date = new Date();
      action.payload.done = false;
      action.payload.createdAt = date.toString();
      state.backend.todoList.push(action.payload)
    }
  },
});

export const { addCurrentProject, deleteTodo, updateTodo, changeTitle, addFrontendTodo, addBackendTodo, updateNewTodo } = currentProjectSlice.actions;
export const selectAllProjects = (state: RootState) => state.projects;
export default currentProjectSlice.reducer;
