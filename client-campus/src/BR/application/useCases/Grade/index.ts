import { repositoryFactory } from "../../../infrastructure/factories/repositoryFactory";
import { GetAllGradesUseCase } from "./getAllGrades.useCase";

let cachedGradeUseCases: {
  getAllGrades: GetAllGradesUseCase;
} | null = null;

export const getGradeUseCases = () => {
  if (!cachedGradeUseCases) {
    const repository = repositoryFactory.getGradeRepository();
    cachedGradeUseCases = {
      getAllGrades: new GetAllGradesUseCase(repository),
    };
  }

  return cachedGradeUseCases;
};
