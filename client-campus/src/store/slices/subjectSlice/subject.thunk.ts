import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Subject } from "../../../BR/domain/entities/subject.interface";
import { getSubjectUseCases } from "../../../BR/application/useCases/Subject";

/* GET ALL */
export const fetchSubjects = createAsyncThunk(
  "subjects/fetchAll",
  async () => {
    return await getSubjectUseCases().getSubjects.execute();
  }
);

/* GET BY ID */
export const fetchSubjectById = createAsyncThunk(
  "subjects/fetchById",
  async (id: string) => {
    return await getSubjectUseCases().getSubjectById.execute(id);
  }
);

/* CREATE */
export const createSubject = createAsyncThunk(
  "subjects/create",
  async (subject: Partial<Subject> ) => {
    return await getSubjectUseCases().createSubject.execute(subject);
  }
);

/* UPDATE */
export const updateSubject = createAsyncThunk(
  "subjects/update",
  async (
    { id, data }: { id: string; data: Partial<Subject> },
    { dispatch }
  ) => {
    const updatedSubject = await getSubjectUseCases().updateSubject.execute(
      id,
      data,
    );
    const refreshedSubjects = await dispatch(fetchSubjects()).unwrap();

    return (
      refreshedSubjects.find((subject) => subject.id_subject === id) ??
      updatedSubject
    );
  }
);

/* DELETE */
export const deleteSubject = createAsyncThunk(
  "subjects/delete",
  async (id: string) => {
    await getSubjectUseCases().deleteSubject.execute(id);
    return id;
  }
);
