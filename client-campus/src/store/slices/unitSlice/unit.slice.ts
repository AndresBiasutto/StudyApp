import { createSlice } from "@reduxjs/toolkit";
import type { UnitState } from "./unit.types";
import {
  createUnit,
  deleteUnit,
  fetchUnitById,
  fetchUnits,
  updateUnit,
} from "./unit.thunk";

const initialState: UnitState = {
  items: [],
  selected: undefined,
  loading: false,
  error: null,
};

const unitSlice = createSlice({
  name: "units",
  initialState,
  reducers: {
    clearSelectedUnit: (state) => {
      state.selected = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnits.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUnits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al obtener unidades";
      })
      .addCase(fetchUnitById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(createUnit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUnit.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al crear la unidad";
      })
      .addCase(updateUnit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUnit.fulfilled, (state, action) => {
        state.loading = false;
        const itemId = action.payload.id_unit;
        const index = state.items.findIndex((unit) => unit.id_unit === itemId);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selected?.id_unit === itemId) {
          state.selected = action.payload;
        }
      })
      .addCase(updateUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al actualizar la unidad";
      })
      .addCase(deleteUnit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUnit.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((unit) => unit.id_unit !== action.payload);
      })
      .addCase(deleteUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al eliminar la unidad";
      });
  },
});

export const { clearSelectedUnit } = unitSlice.actions;
export default unitSlice.reducer;
