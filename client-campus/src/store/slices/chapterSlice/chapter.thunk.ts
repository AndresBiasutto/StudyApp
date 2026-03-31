import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Chapter } from "../../../BR/domain/entities/chapter.interface";
import { getChapterUseCases } from "../../../BR/application/useCases/Chapter";

export const fetchChapters = createAsyncThunk("chapters/fetchAll", async () => {
  return await getChapterUseCases().getChapters.execute();
});

export const fetchChapterById = createAsyncThunk(
  "chapters/fetchById",
  async (id: string | undefined) => {
    return await getChapterUseCases().getChapterById.execute(id);
  }
);

export const createChapter = createAsyncThunk(
  "chapters/create",
  async (chapter: Partial<Chapter>) => {
    return await getChapterUseCases().createChapter.execute(chapter);
  }
);

export const updateChapter = createAsyncThunk(
  "chapters/update",
  async ({ id, data }: { id: string; data: Partial<Chapter> }) => {
    return await getChapterUseCases().updateChapter.execute(id, data);
  }
);

export const saveChapterDraft = createAsyncThunk(
  "chapters/saveDraft",
  async ({ id, data }: { id: string; data: Partial<Chapter> }) => {
    return await getChapterUseCases().saveChapterDraft.execute(id, data);
  }
);

export const publishChapterContent = createAsyncThunk(
  "chapters/publish",
  async ({ id, data }: { id: string; data: Partial<Chapter> }) => {
    return await getChapterUseCases().publishChapter.execute(id, data);
  }
);

export const deleteChapter = createAsyncThunk(
  "chapters/delete",
  async (id: string) => {
    await getChapterUseCases().deleteChapter.execute(id);
    return id;
  }
);
