import { createAsyncThunk } from "@reduxjs/toolkit";

import { getUserUseCases } from "../../../BR/application/useCases/User";
import type {
  LoginCredentials,
  RegisterCredentials,
} from "../../../BR/domain/entities/authCredentials.interface";

export const authenticateUser = createAsyncThunk(
  "auth/authenticateUser",
  async (token: string) => {
    return await getUserUseCases().authUser.execute(token);
  },
);

export const authenticateMe = createAsyncThunk(
  "auth/authenticateMe",
  async () => {
    return await getUserUseCases().authMe.execute();
  },
);

export const loginWithCredentials = createAsyncThunk(
  "auth/loginWithCredentials",
  async (credentials: LoginCredentials) => {
    return await getUserUseCases().login.execute(credentials);
  },
);

export const registerWithCredentials = createAsyncThunk(
  "auth/registerWithCredentials",
  async (credentials: RegisterCredentials) => {
    return await getUserUseCases().register.execute(credentials);
  },
);
