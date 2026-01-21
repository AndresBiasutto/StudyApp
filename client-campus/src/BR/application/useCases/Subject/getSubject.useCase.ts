// GetSubjects.useCase.ts
import type { Subject } from "../../../domain/entities/subject.interface";
import type { SubjectRepository } from "../../../domain/services/subjectRepository";

export class GetSubjectsUseCase {
  private repository: SubjectRepository;

  constructor(repository: SubjectRepository) {
    this.repository = repository;
  }

  execute(): Promise<Subject[]> {
    return this.repository.getAll();
  }
}
