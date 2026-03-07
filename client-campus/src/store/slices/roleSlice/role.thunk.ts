import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoleApiRepository } from "../../../BR/infrastructure/repositories/roleApi.repository";
import { GetAllRolesUseCase } from "../../../BR/application/useCases/Role/getAllRoles.useCase";

const repository = new RoleApiRepository();

/* GET ALL */
export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async () => {
    const useCase = new GetAllRolesUseCase(repository);
    return await useCase.execute();
  }
);


