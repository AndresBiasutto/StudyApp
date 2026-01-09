import { createSlice } from "@reduxjs/toolkit";
import type { UiState } from "../../../interfaces/uiState";

const initialState: UiState = {
  sidebarOpen: false,
  modalOpen: false,
  settingsMenuOpen: false,
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
    toggleModal: (state) => {
      state.modalOpen = !state.modalOpen;
    },
    openModal: (state) => {
      state.modalOpen = true;
    },
    closeModal: (state) => {
      state.modalOpen = false;
    },
    toggleSettingsMenu: (state) => {
      state.settingsMenuOpen = !state.settingsMenuOpen;
    },
    openSettingsMenu: (state) => {
      state.settingsMenuOpen = true;
    },
    closeSettingsMenu: (state) => {
      state.settingsMenuOpen = false;
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
  toggleModal,
  openModal,
  closeModal,
  toggleTheme,
  setDark,
  setLight,
  toggleSettingsMenu
} = uiSlice.actions;

export default uiSlice.reducer;
