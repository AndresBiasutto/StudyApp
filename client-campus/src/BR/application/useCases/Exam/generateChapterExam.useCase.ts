import type { ExamQuestion } from "../../../domain/entities/exam.interface";
import type { ExamRepository } from "../../../domain/services/exam.repository";

export class GenerateChapterExamUseCase {
  private repository: ExamRepository;

  constructor(repository: ExamRepository) {
    this.repository = repository;
  }

  execute(id_chapter: string, force = false): Promise<ExamQuestion[]> {
    return this.repository.generateByChapterId(id_chapter, force);
  }
}
