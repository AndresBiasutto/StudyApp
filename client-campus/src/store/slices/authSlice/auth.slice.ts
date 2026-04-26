import { createSlice } from "@reduxjs/toolkit";

import type { AuthState } from "./auth.types";
import {
  authenticateMe,
  authenticateUser,
  loginWithCredentials,
  registerWithCredentials,
  updateProfile,
} from "./auth.thunk";

const initialState: AuthState = {
  token: null,
  selected: null,
  loading: false,
  updatingProfile: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.selected = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token ?? null;
        state.selected = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al autenticar usuario";
      })
      .addCase(authenticateMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authenticateMe.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(authenticateMe.rejected, (state, action) => {
        state.loading = false;
        state.selected = null;
        state.isAuthenticated = false;
        state.error = action.error.message ?? "No se pudo restaurar la sesion";
      })
      .addCase(loginWithCredentials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithCredentials.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token ?? null;
        state.selected = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginWithCredentials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "No se pudo iniciar sesion";
        state.isAuthenticated = false;
      })
      .addCase(registerWithCredentials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerWithCredentials.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token ?? null;
        state.selected = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerWithCredentials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "No se pudo registrar la cuenta";
        state.isAuthenticated = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.updatingProfile = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updatingProfile = false;
        state.selected = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.updatingProfile = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
