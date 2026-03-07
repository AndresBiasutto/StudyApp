import type { Grade } from "../../../domain/entities/grade.interface";
import type { GradeRepository } from "../../../domain/services/grade.repository";

export class GetAllGradesUseCase {
  private repository: GradeRepository;
  constructor(repository: GradeRepository) {
    this.repository = repository;
  }
  execute(): Promise<Grade[]> {
    return this.repository.getAll();
  }
}