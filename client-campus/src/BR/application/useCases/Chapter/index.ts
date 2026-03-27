import { repositoryFactory } from "../../../infrastructure/factories/repositoryFactory";
import { CreateChapterUseCase } from "./createChapter.useCase";
import { DeleteChapterUseCase } from "./deleteChapter.useCase";
import { GetChapterByIdUseCase } from "./getChapterById.useCase";
import { GetChaptersUseCase } from "./getChapter.useCase";
import { UpdateChapterUseCase } from "./updateChapter.useCase";

let cachedChapterUseCases: {
  createChapter: CreateChapterUseCase;
  deleteChapter: DeleteChapterUseCase;
  getChapterById: GetChapterByIdUseCase;
  getChapters: GetChaptersUseCase;
  updateChapter: UpdateChapterUseCase;
} | null = null;

export const getChapterUseCases = () => {
  if (!cachedChapterUseCases) {
    const repository = repositoryFactory.getChapterRepository();
    cachedChapterUseCases = {
      createChapter: new CreateChapterUseCase(repository),
      deleteChapter: new DeleteChapterUseCase(repository),
      getChapterById: new GetChapterByIdUseCase(repository),
      getChapters: new GetChaptersUseCase(repository),
      updateChapter: new UpdateChapterUseCase(repository),
    };
  }

  return cachedChapterUseCases;
};
