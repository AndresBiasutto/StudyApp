import type { ExamQuestion } from "../../../domain/entities/exam.interface";
import type { ExamRepository } from "../../../domain/services/exam.repository";

export class GetChapterExamUseCase {
  private readonly examRepository: ExamRepository;

  constructor(examRepository: ExamRepository) {
    this.examRepository = examRepository;
  }

  async execute(id_chapter: string): Promise<ExamQuestion[]> {
    return this.examRepository.getChapterExam(id_chapter);
  }
}
