import { createAsyncThunk } from "@reduxjs/toolkit";

import { getExamUseCases } from "../../../BR/application/useCases/Exam";

export const fetchStudentChapterExam = createAsyncThunk(
  "studentExam/fetchStudentChapterExam",
  async (id_chapter: string) => {
    const questions = await getExamUseCases().getChapterExam.execute(id_chapter);

    return {
      id_chapter,
      questions,
    };
  },
);

export const submitStudentChapterExam = createAsyncThunk(
  "studentExam/submitStudentChapterExam",
  async ({
    id_chapter,
    answers,
  }: {
    id_chapter: string;
    answers: string[];
  }) => {
    const result = await getExamUseCases().submitChapterExam.execute(
      id_chapter,
      answers,
    );

    return result;
  },
);

export const fetchMyStudentChapterExamResult = createAsyncThunk(
  "studentExam/fetchMyStudentChapterExamResult",
  async (id_chapter: string, { rejectWithValue }) => {
    try {
      return await getExamUseCases().getMyChapterExamResult.execute(id_chapter);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No se pudo cargar la nota";

      return rejectWithValue(message);
    }
  },
);
