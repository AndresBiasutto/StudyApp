import { createAsyncThunk } from "@reduxjs/toolkit";
import { SubjectApiRepository } from "../../../../BR/infrastructure/repositories/subjectApiRepository";
import { GetSubjectsUseCase } from "../../../../BR/application/useCases/getSubject.useCase";
import { GetSubjectByIdUseCase } from "../../../../BR/application/useCases/getSubjectById.useCase";
import { CreateSubjectUseCase } from "../../../../BR/application/useCases/createSubject.useCase";
import { UpdateSubjectUseCase } from "../../../../BR/application/useCases/updateSubject.useCase";
import { DeleteSubjectUseCase } from "../../../../BR/application/useCases/deleteSubject.useCase";
import type { Subject } from "../../../../BR/domain/entities/subject.interface";

const repository = new SubjectApiRepository();

/* GET ALL */
export const fetchSubjects = createAsyncThunk(
  "subjects/fetchAll",
  async () => {
    const useCase = new GetSubjectsUseCase(repository);
    return await useCase.execute();
  }
);

/* GET BY ID */
export const fetchSubjectById = createAsyncThunk(
  "subjects/fetchById",
  async (id: number) => {
    const useCase = new GetSubjectByIdUseCase(repository);
    return await useCase.execute(id);
  }
);

/* CREATE */
export const createSubject = createAsyncThunk(
  "subjects/create",
  async (subject: Omit<Subject, "id">) => {
    const useCase = new CreateSubjectUseCase(repository);
    return await useCase.execute(subject);
  }
);

/* UPDATE */
export const updateSubject = createAsyncThunk(
  "subjects/update",
  async ({ id, data }: { id: number; data: Partial<Subject> }) => {
    const useCase = new UpdateSubjectUseCase(repository);
    return await useCase.execute(id, data);
  }
);

/* DELETE */
export const deleteSubject = createAsyncThunk(
  "subjects/delete",
  async (id: number) => {
    const useCase = new DeleteSubjectUseCase(repository);
    await useCase.execute(id);
    return id;
  }
);
