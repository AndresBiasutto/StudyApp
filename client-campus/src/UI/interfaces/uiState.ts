export interface UiState {
  sidebarOpen: boolean;
  modalOpen: boolean;
  isDark: boolean;
  settingsMenuOpen: boolean;
  modalContent:{
    type:string;
    data: null ;
    title:string;
  }
}