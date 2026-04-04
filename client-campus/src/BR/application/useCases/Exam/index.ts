import { repositoryFactory } from "../../../infrastructure/factories/repositoryFactory";
import { GenerateChapterExamUseCase } from "./generateChapterExam.useCase";

let cachedExamUseCases: {
  generateChapterExam: GenerateChapterExamUseCase;
} | null = null;

export const getExamUseCases = () => {
  if (!cachedExamUseCases) {
    const repository = repositoryFactory.getExamRepository();

    cachedExamUseCases = {
      generateChapterExam: new GenerateChapterExamUseCase(repository),
    };
  }

  return cachedExamUseCases;
};
