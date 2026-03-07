import { createSlice } from "@reduxjs/toolkit";
import type { UserState } from "./user.types";
import {
  fetchUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
  fetchListedUsers,
  fetchSelectedUser,
  updateRole,
} from "./user.thunk";

const initialState: UserState = {
  items: [],
  selected: undefined,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearSelectedUser: (state) => {
      state.selected = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      /* FETCH ALL */
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchListedUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al obtener subjects";
      })
      .addCase(fetchSelectedUser.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      /* FETCH BY ID */
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })

      /* CREATE */
      .addCase(createUser.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      /* UPDATE */
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (s) => s.id_user === action.payload.id_user,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (s) => s.id_user === action.payload.id_user,
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }

        // 🔥 ESTA LÍNEA ES LA QUE TE FALTA
        if (state.selected?.id_user === action.payload.id_user) {
          state.selected = action.payload;
        }
      })

      /* DELETE */
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter((s) => s.id_user !== action.payload);
      });
  },
});

export const { clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;
