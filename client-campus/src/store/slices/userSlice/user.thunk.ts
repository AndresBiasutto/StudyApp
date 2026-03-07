import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserApiRepository } from "../../../BR/infrastructure/repositories/userApiRepository";
import { GetUsersUseCase } from "../../../BR/application/useCases/User/getUsers.useCase";
import { GetUserByIdUseCase } from "../../../BR/application/useCases/User/getUserById.useCase";
import type { User } from "../../../BR/domain/entities/user.interface";
import { CreateUserUseCase } from "../../../BR/application/useCases/User/createUser.useCase";
import { UpdateUserUseCase } from "../../../BR/application/useCases/User/updateUser.useCase";
import { DeleteUserUseCase } from "../../../BR/application/useCases/User/deleteUser.useCase";
import { GetListedUsersUseCase } from "../../../BR/application/useCases/User/getListedUsers.useCase";
import { GetUserData } from "../../../BR/application/useCases/User/getUserData.useCase";
import { UpdateRoleUseCase } from "../../../BR/application/useCases/User/updateRole.useCase";

const repository = new UserApiRepository();

/* GET ALL */
export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async () => {
    const useCase = new GetUsersUseCase(repository);
    return await useCase.execute();
  }
);
export const fetchListedUsers = createAsyncThunk(
  "users/fetchListed",
  async () => {
    const useCase = new GetListedUsersUseCase(repository);
    return await useCase.execute();
  }
);
export const updateRole = createAsyncThunk(
  "users/updateRole",
  async ({ id_user, id_role }: { id_user: string; id_role: string }) => {
    const useCase = new UpdateRoleUseCase(repository);
    return await useCase.execute(id_user, id_role);
  }
);
/* GET BY ID */
export const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (id: string) => {
    const useCase = new GetUserByIdUseCase(repository);
    return await useCase.execute(id);
  }
);
export const fetchSelectedUser = createAsyncThunk(
  "users/fetchSelected",
  async (id: string) => {
    const useCase = new GetUserData(repository);
    return await useCase.execute(id);
  }
);

/* CREATE */
export const createUser = createAsyncThunk(
  "users/create",
  async (user: Omit<User, "id">) => {
    const useCase = new CreateUserUseCase(repository);
    return await useCase.execute(user);
  }
);

/* UPDATE */
export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, data }: { id: string; data: Partial<User> }) => {
    const useCase = new UpdateUserUseCase(repository);
    return await useCase.execute(id, data);
  }
);

/* DELETE */
export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id: string) => {
    const useCase = new DeleteUserUseCase(repository);
    await useCase.execute(id);
    return id;
  }
);
