import { createAsyncThunk } from "@reduxjs/toolkit";
import { getExamUseCases } from "../../../BR/application/useCases/Exam";

export const generateChapterExam = createAsyncThunk(
  "exam/generateChapterExam",
  async ({
    id_chapter,
    force = false,
  }: {
    id_chapter: string;
    force?: boolean;
  }) => {
    const questions = await getExamUseCases().generateChapterExam.execute(
      id_chapter,
      force,
    );

    return {
      id_chapter,
      questions,
    };
  },
);
