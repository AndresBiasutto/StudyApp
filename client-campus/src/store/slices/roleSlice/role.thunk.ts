import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRoleUseCases } from "../../../BR/application/useCases/Role";

/* GET ALL */
export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async () => {
    return await getRoleUseCases().getAllRoles.execute();
  }
);


