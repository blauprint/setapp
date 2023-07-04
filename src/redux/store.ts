import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "@/redux/projectsSlice";
import currentProjectReducer from "@/redux/currentProjectSlice"
import selectedReducer from "@/redux/selectedSlice"

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    currentProject: currentProjectReducer,
    selected: selectedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
