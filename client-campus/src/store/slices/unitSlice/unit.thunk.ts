import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Unit } from "../../../BR/domain/entities/unit.interface";
import { CreateUnitUseCase } from "../../../BR/application/useCases/Unit/createUnit.useCase";
import { DeleteUnitUseCase } from "../../../BR/application/useCases/Unit/deleteUnit.useCase";
import { GetUnitByIdUseCase } from "../../../BR/application/useCases/Unit/getUnitById.useCase";
import { GetUnitsUseCase } from "../../../BR/application/useCases/Unit/getUnit.useCase";
import { UpdateUnitUseCase } from "../../../BR/application/useCases/Unit/updateUnit.useCase";
import { UnitApiRepository } from "../../../BR/infrastructure/repositories/unitApiRepository";

const repository = new UnitApiRepository();

export const fetchUnits = createAsyncThunk("units/fetchAll", async () => {
  const useCase = new GetUnitsUseCase(repository);
  return await useCase.execute();
});

export const fetchUnitById = createAsyncThunk(
  "units/fetchById",
  async (id: string) => {
    const useCase = new GetUnitByIdUseCase(repository);
    return await useCase.execute(id);
  }
);

export const createUnit = createAsyncThunk(
  "units/create",
  async (unit: Partial<Unit>) => {
    const useCase = new CreateUnitUseCase(repository);
    return await useCase.execute(unit);
  }
);

export const updateUnit = createAsyncThunk(
  "units/update",
  async ({ id, data }: { id: string; data: Partial<Unit> }) => {
    const useCase = new UpdateUnitUseCase(repository);
    return await useCase.execute(id, data);
  }
);

export const deleteUnit = createAsyncThunk(
  "units/delete",
  async (id: string) => {
    const useCase = new DeleteUnitUseCase(repository);
    await useCase.execute(id);
    return id;
  }
);
