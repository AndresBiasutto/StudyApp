import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Unit } from "../../../BR/domain/entities/unit.interface";
import { getUnitUseCases } from "../../../BR/application/useCases/Unit";

export const fetchUnits = createAsyncThunk("units/fetchAll", async () => {
  return await getUnitUseCases().getUnits.execute();
});

export const fetchUnitById = createAsyncThunk(
  "units/fetchById",
  async (id: string) => {
    return await getUnitUseCases().getUnitById.execute(id);
  }
);

export const createUnit = createAsyncThunk(
  "units/create",
  async (unit: Partial<Unit>) => {
    return await getUnitUseCases().createUnit.execute(unit);
  }
);

export const updateUnit = createAsyncThunk(
  "units/update",
  async ({ id, data }: { id: string; data: Partial<Unit> }) => {
    return await getUnitUseCases().updateUnit.execute(id, data);
  }
);

export const deleteUnit = createAsyncThunk(
  "units/delete",
  async (id: string) => {
    await getUnitUseCases().deleteUnit.execute(id);
    return id;
  }
);
