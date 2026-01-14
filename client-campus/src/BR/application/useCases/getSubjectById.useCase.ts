import type { SubjectRepository } from "../../domain/services/subjectRepository";
import type { Subject } from "../../../types/subject";

export class GetSubjectByIdUseCase {
  private repository: SubjectRepository;

  constructor(repository: SubjectRepository) {
    this.repository = repository;
  }

  execute(id: number): Promise<Subject> {
    return this.repository.getById(id);
  }
}