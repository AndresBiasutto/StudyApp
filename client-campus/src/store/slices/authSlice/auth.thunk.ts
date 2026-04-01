import { createAsyncThunk } from "@reduxjs/toolkit";

import { getUserUseCases } from "../../../BR/application/useCases/User";

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
