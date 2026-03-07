import type { Subject } from "../../../domain/entities/subject.interface";
import type { SubjectRepository } from "../../../domain/services/subjectRepository";

export class CreateSubjectUseCase {
  private repository: SubjectRepository;

  constructor(repository: SubjectRepository) {
    this.repository = repository;
  }

  execute(subject: Partial<Subject> ): Promise<Subject> {
    return this.repository.create(subject);
  }
}
