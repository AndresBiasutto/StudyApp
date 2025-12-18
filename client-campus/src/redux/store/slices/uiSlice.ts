import { createSlice } from "@reduxjs/toolkit";
import type { UiState } from "../../../interfaces/uiState";


const initialState: UiState = {
  sidebarOpen: false,
  isDark: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openSidebar: (state) => {
      state.sidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
    },
    setDark: (state) => {
      state.isDark = true;
    },
    setLight: (state) => {
      state.isDark = false;
    },
  },
});

export const {
  toggleSidebar,
  openSidebar,
  closeSidebar,
  toggleTheme,
  setDark,
  setLight,
} = uiSlice.actions;

export default uiSlice.reducer;
