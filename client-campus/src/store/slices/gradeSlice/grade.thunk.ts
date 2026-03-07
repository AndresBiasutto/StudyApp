import { createAsyncThunk } from "@reduxjs/toolkit";
import { GradeApiRepository } from "../../../BR/infrastructure/repositories/grade.repository";
import { GetAllGradesUseCase } from "../../../BR/application/useCases/Grade/getAllGrades.useCase";


const repository = new GradeApiRepository();

/* GET ALL */
export const fetchGrades = createAsyncThunk(
  "grades/fetchGrades",
  async () => {
    const useCase = new GetAllGradesUseCase(repository);
    return await useCase.execute();
  }
);


