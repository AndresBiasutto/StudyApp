import { repositoryFactory } from "../../../infrastructure/factories/repositoryFactory";
import { CreateSubjectUseCase } from "./createSubject.useCase";
import { DeleteSubjectUseCase } from "./deleteSubject.useCase";
import { GetSubjectsUseCase } from "./getSubject.useCase";
import { GetSubjectByIdUseCase } from "./getSubjectById.useCase";
import { UpdateSubjectUseCase } from "./updateSubject.useCase";
import { UpdateSubjectTeacherUseCase } from "./updateSubjectTeacher.useCase";

let cachedSubjectUseCases: {
  createSubject: CreateSubjectUseCase;
  deleteSubject: DeleteSubjectUseCase;
  getSubjectById: GetSubjectByIdUseCase;
  getSubjects: GetSubjectsUseCase;
  updateSubject: UpdateSubjectUseCase;
  updateSubjectTeacher: UpdateSubjectTeacherUseCase;
} | null = null;

export const getSubjectUseCases = () => {
  if (!cachedSubjectUseCases) {
    const repository = repositoryFactory.getSubjectRepository();
    cachedSubjectUseCases = {
      createSubject: new CreateSubjectUseCase(repository),
      deleteSubject: new DeleteSubjectUseCase(repository),
      getSubjectById: new GetSubjectByIdUseCase(repository),
      getSubjects: new GetSubjectsUseCase(repository),
      updateSubject: new UpdateSubjectUseCase(repository),
      updateSubjectTeacher: new UpdateSubjectTeacherUseCase(repository),
    };
  }

  return cachedSubjectUseCases;
};
