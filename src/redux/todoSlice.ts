
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoItem } from '@/types/typedefs';

interface TodoState {
  backend: {
    todoList: TodoItem[];
  };
  frontend: {
    todoList: TodoItem[];
  };
}

const initialState: TodoState = {
  backend: {
    todoList: [],
  },
  frontend: {
    todoList: [],
  },
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoItem>) => {
      if (action.payload.backendId) {
        state.backend.todoList.push(action.payload);
      } else {
        state.frontend.todoList.push(action.payload);
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.backend.todoList = state.backend.todoList.filter((todo) => todo.id !== action.payload);
      state.frontend.todoList = state.frontend.todoList.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;

