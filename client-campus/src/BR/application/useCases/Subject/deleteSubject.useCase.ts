// DeleteSubject.useCase.ts

import type { SubjectRepository } from "../../../domain/services/subjectRepository";

export class DeleteSubjectUseCase {
  private repository: SubjectRepository;

  constructor(repository: SubjectRepository) {
    this.repository = repository;
  }

  execute(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}
