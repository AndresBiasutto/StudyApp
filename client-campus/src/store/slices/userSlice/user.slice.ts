import { createSlice } from "@reduxjs/toolkit";

import type { User } from "../../../BR/domain/entities/user.interface";
import type { UserState } from "./user.types";
import {
  createUser,
  deleteUser,
  fetchListedUsers,
  fetchSelectedUser,
  fetchStudents,
  fetchTeachers,
  fetchUserById,
  fetchUsers,
  updateRole,
  updateUser,
} from "./user.thunk";

const initialState: UserState = {
  items: [],
  teachers: [],
  students: [],
  selected: undefined,
  loadingList: false,
  loadingSelected: false,
  loadingTeachers: false,
  loadingStudents: false,
  creating: false,
  updating: false,
  updatingRole: false,
  deleting: false,
  error: null,
};

const replaceUserInCollection = (collection: User[], updatedUser: User): User[] =>
  collection.map((user) =>
    user.id_user === updatedUser.id_user ? updatedUser : user,
  );

const removeUserFromCollection = (collection: User[], idUser: string): User[] =>
  collection.filter((user) => user.id_user !== idUser);

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
      .addCase(fetchUsers.pending, (state) => {
        state.loadingList = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loadingList = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loadingList = false;
        state.error = action.error.message ?? "Error al obtener usuarios";
      })

      .addCase(fetchListedUsers.pending, (state) => {
        state.loadingList = true;
        state.error = null;
      })
      .addCase(fetchListedUsers.fulfilled, (state, action) => {
        state.loadingList = false;
        state.items = action.payload;
      })
      .addCase(fetchListedUsers.rejected, (state, action) => {
        state.loadingList = false;
        state.error = action.error.message ?? "Error al obtener usuarios";
      })

      .addCase(fetchTeachers.pending, (state) => {
        state.loadingTeachers = true;
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loadingTeachers = false;
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loadingTeachers = false;
        state.error = action.error.message ?? "Error al obtener profesores";
      })

      .addCase(fetchStudents.pending, (state) => {
        state.loadingStudents = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loadingStudents = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loadingStudents = false;
        state.error = action.error.message ?? "Error al obtener estudiantes";
      })

      .addCase(fetchSelectedUser.pending, (state) => {
        state.loadingSelected = true;
        state.error = null;
      })
      .addCase(fetchSelectedUser.fulfilled, (state, action) => {
        state.loadingSelected = false;
        state.selected = action.payload;
      })
      .addCase(fetchSelectedUser.rejected, (state, action) => {
        state.loadingSelected = false;
        state.error =
          action.error.message ?? "Error al obtener el usuario seleccionado";
      })

      .addCase(fetchUserById.pending, (state) => {
        state.loadingSelected = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loadingSelected = false;
        state.selected = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loadingSelected = false;
        state.error = action.error.message ?? "Error al obtener el usuario";
      })

      .addCase(createUser.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.creating = false;
        state.items.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.creating = false;
        state.error = action.error.message ?? "Error al crear usuario";
      })

      .addCase(updateUser.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updating = false;
        state.items = replaceUserInCollection(state.items, action.payload);
        state.teachers = replaceUserInCollection(state.teachers, action.payload);
        state.students = replaceUserInCollection(state.students, action.payload);

        if (state.selected?.id_user === action.payload.id_user) {
          state.selected = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updating = false;
        state.error = action.error.message ?? "Error al actualizar usuario";
      })

      .addCase(updateRole.pending, (state) => {
        state.updatingRole = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.updatingRole = false;
        state.items = replaceUserInCollection(state.items, action.payload);
        state.teachers = replaceUserInCollection(state.teachers, action.payload);
        state.students = replaceUserInCollection(state.students, action.payload);

        if (state.selected?.id_user === action.payload.id_user) {
          state.selected = action.payload;
        }
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.updatingRole = false;
        state.error = action.error.message ?? "Error al actualizar rol";
      })

      .addCase(deleteUser.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleting = false;
        state.items = removeUserFromCollection(state.items, action.payload);
        state.teachers = removeUserFromCollection(state.teachers, action.payload);
        state.students = removeUserFromCollection(state.students, action.payload);

        if (state.selected?.id_user === action.payload) {
          state.selected = undefined;
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.error.message ?? "Error al eliminar usuario";
      });
  },
});

export const { clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;
