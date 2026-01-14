import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import uiReducer from "./slices/uiSlice";
import subjectReducer from "./slices/subject/subject.slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    ui: uiReducer,
    subjects: subjectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
