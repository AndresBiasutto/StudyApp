import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Chapter } from "../../../BR/domain/entities/chapter.interface";
import { CreateChapterUseCase } from "../../../BR/application/useCases/Chapter/createChapter.useCase";
import { DeleteChapterUseCase } from "../../../BR/application/useCases/Chapter/deleteChapter.useCase";
import { GetChapterByIdUseCase } from "../../../BR/application/useCases/Chapter/getChapterById.useCase";
import { GetChaptersUseCase } from "../../../BR/application/useCases/Chapter/getChapter.useCase";
import { UpdateChapterUseCase } from "../../../BR/application/useCases/Chapter/updateChapter.useCase";
import { ChapterApiRepository } from "../../../BR/infrastructure/repositories/chapterApiRepository";

const repository = new ChapterApiRepository();

export const fetchChapters = createAsyncThunk("chapters/fetchAll", async () => {
  const useCase = new GetChaptersUseCase(repository);
  return await useCase.execute();
});

export const fetchChapterById = createAsyncThunk(
  "chapters/fetchById",
  async (id: string) => {
    const useCase = new GetChapterByIdUseCase(repository);
    return await useCase.execute(id);
  }
);

export const createChapter = createAsyncThunk(
  "chapters/create",
  async (chapter: Partial<Chapter>) => {
    const useCase = new CreateChapterUseCase(repository);
    return await useCase.execute(chapter);
  }
);

export const updateChapter = createAsyncThunk(
  "chapters/update",
  async ({ id, data }: { id: string; data: Partial<Chapter> }) => {
    const useCase = new UpdateChapterUseCase(repository);
    return await useCase.execute(id, data);
  }
);

export const deleteChapter = createAsyncThunk(
  "chapters/delete",
  async (id: string) => {
    const useCase = new DeleteChapterUseCase(repository);
    await useCase.execute(id);
    return id;
  }
);
