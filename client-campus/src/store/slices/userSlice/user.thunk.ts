import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "../../../BR/domain/entities/user.interface";
import { getUserUseCases } from "../../../BR/application/useCases/User";

/* GET ALL */
export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async () => {
    return await getUserUseCases().getUsers.execute();
  }
);
export const fetchTeachers = createAsyncThunk(
  "users/fetchTeachers",
  async () => {
    return await getUserUseCases().getAllTeachers.execute();
  }
);
export const fetchStudents = createAsyncThunk(
  "users/fetchStudents",
  async () => {
    return await getUserUseCases().getAllStudents.execute();
  }
);
export const fetchListedUsers = createAsyncThunk(
  "users/fetchListed",
  async () => {
    return await getUserUseCases().getListedUsers.execute();
  }
);
export const updateRole = createAsyncThunk(
  "users/updateRole",
  async ({ id_user, id_role }: { id_user: string; id_role: string }) => {
    return await getUserUseCases().updateRole.execute(id_user, id_role);
  }
);
/* GET BY ID */
export const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (id: string) => {
    return await getUserUseCases().getUserById.execute(id);
  }
);
export const fetchSelectedUser = createAsyncThunk(
  "users/fetchSelected",
  async (id: string) => {
    return await getUserUseCases().getUserData.execute(id);
  }
);

/* CREATE */
export const createUser = createAsyncThunk(
  "users/create",
  async (user: Omit<User, "id">) => {
    return await getUserUseCases().createUser.execute(user);
  }
);

/* UPDATE */
export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, data }: { id: string; data: Partial<User> }) => {
    return await getUserUseCases().updateUser.execute(id, data);
  }
);

/* DELETE */
export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id: string) => {
    await getUserUseCases().deleteUser.execute(id);
    return id;
  }
);
