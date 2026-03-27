import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGradeUseCases } from "../../../BR/application/useCases/Grade";

/* GET ALL */
export const fetchGrades = createAsyncThunk(
  "grades/fetchGrades",
  async () => {
    return await getGradeUseCases().getAllGrades.execute();
  }
);


