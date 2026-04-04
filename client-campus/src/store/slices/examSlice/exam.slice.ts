import { createSlice } from "@reduxjs/toolkit";

import type { ExamState } from "./exam.types";
import { generateChapterExam } from "./exam.thunk";

const initialState: ExamState = {
  generated: [],
  currentChapterId: null,
  loadingGenerate: false,
  saving: false,
  error: null,
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    clearExamState: (state) => {
      state.generated = [];
      state.currentChapterId = null;
      state.loadingGenerate = false;
      state.saving = false;
      state.error = null;
    },
    startSavingExam: (state) => {
      state.saving = true;
    },
    finishSavingExam: (state) => {
      state.saving = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateChapterExam.pending, (state, action) => {
        state.loadingGenerate = true;
        state.error = null;
        state.currentChapterId = action.meta.arg.id_chapter;
        state.generated = [];
      })
      .addCase(generateChapterExam.fulfilled, (state, action) => {
        state.loadingGenerate = false;
        state.currentChapterId = action.payload.id_chapter;
        state.generated = action.payload.questions;
      })
      .addCase(generateChapterExam.rejected, (state, action) => {
        state.loadingGenerate = false;
        state.error =
          action.error.message ?? "Error al generar el examen";
      });
  },
});

export const { clearExamState, startSavingExam, finishSavingExam } =
  examSlice.actions;
export default examSlice.reducer;
