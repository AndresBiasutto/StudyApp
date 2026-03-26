import type { Subject } from "../../../domain/entities/subject.interface";
import type { SubjectRepository } from "../../../domain/services/subjectRepository";

export class GetSubjectByIdUseCase {
  private repository: SubjectRepository;

  constructor(repository: SubjectRepository) {
    this.repository = repository;
  }

  execute(id: string): Promise<Subject> {
    return this.repository.getById(id);
  }
}