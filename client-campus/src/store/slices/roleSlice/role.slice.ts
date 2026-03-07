import { createSlice } from "@reduxjs/toolkit";
import type { RoleState } from "./role.types";
import {
  fetchRoles,
} from "./role.thunk";

const initialState: RoleState = {
  items: [],
  selected: undefined,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    clearSelectedRole: (state) => {
      state.selected = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      /* FETCH ALL */
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al obtener subjects";
      })
  },
});

export const { clearSelectedRole } = userSlice.actions;
export default userSlice.reducer;
