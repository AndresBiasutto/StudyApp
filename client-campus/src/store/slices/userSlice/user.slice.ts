import { createSlice } from "@reduxjs/toolkit";
import type { UserState } from "./user.types";
import {
  fetchUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
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
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al obtener subjects";
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
          (s) => s.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      /* DELETE */
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (s) => s.id !== action.payload
        );
      });
  },
});

export const { clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;
