import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import subjectReducer from "./slices/subjectSlice/subject.slice";
import userReducer from "./slices/userSlice/user.slice"

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    users: userReducer,
    subjects: subjectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
