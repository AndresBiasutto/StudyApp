import { createSlice } from "@reduxjs/toolkit";
import type { UserState } from "./user.types";
import {
  fetchUsers,
  fetchTeachers,
  fetchStudents,
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
  teachers: [],
  students: [],
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
      .addCase(fetchListedUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListedUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchListedUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al obtener usuarios";
      })
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al obtener profesores";
      })
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al obtener estudiantes";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al obtener usuarios";
      })
      .addCase(fetchSelectedUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSelectedUser.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchSelectedUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? "Error al obtener el usuario seleccionado";
      })
      /* FETCH BY ID */
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al obtener el usuario";
      })

      /* CREATE */
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al crear usuario";
      })

      /* UPDATE */
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (s) => s.id_user === action.payload.id_user,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al actualizar usuario";
      })
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
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
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al actualizar rol";
      })

      /* DELETE */
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((s) => s.id_user !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al eliminar usuario";
      });
  },
});

export const { clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;
