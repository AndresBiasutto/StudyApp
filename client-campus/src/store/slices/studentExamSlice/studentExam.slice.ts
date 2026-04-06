import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { StudentExamState } from "./studentExam.types";
import {
  fetchMyStudentChapterExamResult,
  fetchStudentChapterExam,
  submitStudentChapterExam,
} from "./studentExam.thunk";

const initialState: StudentExamState = {
  questions: [],
  selectedAnswers: {},
  loadingExam: false,
  submitting: false,
  result: null,
  error: null,
  currentChapterId: null,
};

const studentExamSlice = createSlice({
  name: "studentExam",
  initialState,
  reducers: {
    clearStudentExamState: (state) => {
      state.questions = [];
      state.selectedAnswers = {};
      state.loadingExam = false;
      state.submitting = false;
      state.result = null;
      state.error = null;
      state.currentChapterId = null;
    },
    clearStudentExamAnswers: (state) => {
      state.selectedAnswers = {};
    },
    setStudentExamAnswer: (
      state,
      action: PayloadAction<{ index: number; answer: string }>,
    ) => {
      state.selectedAnswers[action.payload.index] = action.payload.answer;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentChapterExam.pending, (state, action) => {
        state.loadingExam = true;
        state.error = null;
        state.questions = [];
        state.selectedAnswers = {};
        state.currentChapterId = action.meta.arg;
      })
      .addCase(fetchStudentChapterExam.fulfilled, (state, action) => {
        state.loadingExam = false;
        state.questions = action.payload.questions;
        state.currentChapterId = action.payload.id_chapter;
      })
      .addCase(fetchStudentChapterExam.rejected, (state, action) => {
        state.loadingExam = false;
        state.error = action.error.message ?? "No se pudo cargar el examen";
      })
      .addCase(submitStudentChapterExam.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(submitStudentChapterExam.fulfilled, (state, action) => {
        state.submitting = false;
        state.result = action.payload;
        state.currentChapterId = action.payload.id_chapter;
      })
      .addCase(submitStudentChapterExam.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message ?? "No se pudo guardar la nota";
      })
      .addCase(fetchMyStudentChapterExamResult.pending, (state, action) => {
        state.currentChapterId = action.meta.arg;
      })
      .addCase(fetchMyStudentChapterExamResult.fulfilled, (state, action) => {
        state.result = action.payload;
        state.currentChapterId = action.payload.id_chapter;
      })
      .addCase(fetchMyStudentChapterExamResult.rejected, (state, action) => {
        if (action.payload) {
          return;
        }

        state.error =
          action.error.message ?? "No se pudo cargar la nota del examen";
      });
  },
});

export const {
  clearStudentExamState,
  clearStudentExamAnswers,
  setStudentExamAnswer,
} = studentExamSlice.actions;

export default studentExamSlice.reducer;
