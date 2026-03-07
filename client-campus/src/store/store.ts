import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import uiReducer from "./slices/uiSlice";
import subjectReducer from "./slices/subjectSlice/subject.slice";
import userReducer from "./slices/userSlice/user.slice";
import authReducer from "./slices/authSlice/auth.slice";
import rolesReducer from "./slices/roleSlice/role.slice";
import gradesReducer from "./slices/gradeSlice/grade.slice";

// 🔹 Persist config SOLO para auth
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const rootReducer = combineReducers({
  ui: uiReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  users: userReducer,
  subjects: subjectReducer,
  roles: rolesReducer,
  grades: gradesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// import { configureStore } from "@reduxjs/toolkit";
// import uiReducer from "./slices/uiSlice";
// import subjectReducer from "./slices/subjectSlice/subject.slice";
// import userReducer from "./slices/userSlice/user.slice"
// import authReducer from "./slices/authSlice/auth.slice"

// export const store = configureStore({
//   reducer: {
//     ui: uiReducer,
//     auth: authReducer,
//     users: userReducer,
//     subjects: subjectReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
