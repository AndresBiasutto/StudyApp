import { createSlice } from "@reduxjs/toolkit";
import type { GradeState } from "./grade.types";
import {
  fetchGrades,
} from "./grade.thunk";

const initialState: GradeState = {
  items: [],
  selected: undefined,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "grades",
  initialState,
  reducers: {
    clearSelectedGrade: (state) => {
      state.selected = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      /* FETCH ALL */
      .addCase(fetchGrades.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGrades.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchGrades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al obtener el año escolar";
      })
  },
});

export const { clearSelectedGrade } = userSlice.actions;
export default userSlice.reducer;
