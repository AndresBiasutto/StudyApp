import { repositoryFactory } from "../../../infrastructure/factories/repositoryFactory";
import { GenerateChapterExamUseCase } from "./generateChapterExam.useCase";
import { GetChapterExamUseCase } from "./getChapterExam.useCase";
import { GetMyChapterExamResultUseCase } from "./getMyChapterExamResult.useCase";
import { SubmitChapterExamUseCase } from "./submitChapterExam.useCase";

let cachedExamUseCases: {
  generateChapterExam: GenerateChapterExamUseCase;
  getChapterExam: GetChapterExamUseCase;
  submitChapterExam: SubmitChapterExamUseCase;
  getMyChapterExamResult: GetMyChapterExamResultUseCase;
} | null = null;

export const getExamUseCases = () => {
  if (!cachedExamUseCases) {
    const repository = repositoryFactory.getExamRepository();

    cachedExamUseCases = {
      generateChapterExam: new GenerateChapterExamUseCase(repository),
      getChapterExam: new GetChapterExamUseCase(repository),
      submitChapterExam: new SubmitChapterExamUseCase(repository),
      getMyChapterExamResult: new GetMyChapterExamResultUseCase(repository),
    };
  }

  return cachedExamUseCases;
};
