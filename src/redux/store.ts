import { configureStore, current } from "@reduxjs/toolkit";
import projectReducer from "@/redux/projectsSlice";
import currentProjectReducer from "@/redux/currentProjectSlice"

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    currentProject: currentProjectReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
