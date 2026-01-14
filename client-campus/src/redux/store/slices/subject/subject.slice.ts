import { createSlice } from "@reduxjs/toolkit";
import type { SubjectState } from "./subject.types";
import {
  fetchSubjects,
  fetchSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
} from "./subject.thunk";

const initialState: SubjectState = {
  items: [],
  selected: undefined,
  loading: false,
  error: null,
};

const subjectSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    clearSelectedSubject: (state) => {
      state.selected = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      /* FETCH ALL */
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al obtener subjects";
      })

      /* FETCH BY ID */
      .addCase(fetchSubjectById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })

      /* CREATE */
      .addCase(createSubject.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      /* UPDATE */
      .addCase(updateSubject.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      /* DELETE */
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (s) => s.id !== action.payload
        );
      });
  },
});

export const { clearSelectedSubject } = subjectSlice.actions;
export default subjectSlice.reducer;
