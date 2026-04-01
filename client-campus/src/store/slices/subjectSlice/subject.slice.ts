import { createSlice } from "@reduxjs/toolkit";

import type { Subject } from "../../../BR/domain/entities/subject.interface";
import type { SubjectState } from "./subject.types";
import {
  createSubject,
  deleteSubject,
  fetchSubjectById,
  fetchSubjects,
  updateSubject,
} from "./subject.thunk";

const initialState: SubjectState = {
  items: [],
  selected: undefined,
  loadingList: false,
  loadingSelected: false,
  creating: false,
  updating: false,
  deleting: false,
  error: null,
};

const replaceSubjectInCollection = (
  collection: Subject[],
  updatedSubject: Subject,
): Subject[] =>
  collection.map((subject) =>
    subject.id_subject === updatedSubject.id_subject ? updatedSubject : subject,
  );

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
      .addCase(fetchSubjects.pending, (state) => {
        state.loadingList = true;
        state.error = null;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loadingList = false;
        state.items = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loadingList = false;
        state.error = action.error.message ?? "Error al obtener subjects";
      })

      .addCase(fetchSubjectById.pending, (state) => {
        state.loadingSelected = true;
        state.error = null;
      })
      .addCase(fetchSubjectById.fulfilled, (state, action) => {
        state.loadingSelected = false;
        state.selected = action.payload;
      })
      .addCase(fetchSubjectById.rejected, (state, action) => {
        state.loadingSelected = false;
        state.error = action.error.message ?? "Error al obtener la materia";
      })

      .addCase(createSubject.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        state.creating = false;
        state.items.push(action.payload);
      })
      .addCase(createSubject.rejected, (state, action) => {
        state.creating = false;
        state.error = action.error.message ?? "Error al crear la materia";
      })

      .addCase(updateSubject.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        state.updating = false;
        state.items = replaceSubjectInCollection(state.items, action.payload);

        if (state.selected?.id_subject === action.payload.id_subject) {
          state.selected = action.payload;
        }
      })
      .addCase(updateSubject.rejected, (state, action) => {
        state.updating = false;
        state.error = action.error.message ?? "Error al actualizar la materia";
      })

      .addCase(deleteSubject.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.deleting = false;
        state.items = state.items.filter(
          (subject) => subject.id_subject !== action.payload,
        );

        if (state.selected?.id_subject === action.payload) {
          state.selected = undefined;
        }
      })
      .addCase(deleteSubject.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.error.message ?? "Error al eliminar la materia";
      });
  },
});

export const { clearSelectedSubject } = subjectSlice.actions;
export default subjectSlice.reducer;
