// UpdateSubject.useCase.ts

import type { Subject } from "../../domain/entities/subject.interface";
import type { SubjectRepository } from "../../domain/services/subjectRepository";


export class UpdateSubjectUseCase {
  private repository: SubjectRepository;

  constructor(repository: SubjectRepository) {
    this.repository = repository;
  }

  execute(id: number, subject: Partial<Subject>): Promise<Subject> {
    return this.repository.update(id, subject);
  }
}
