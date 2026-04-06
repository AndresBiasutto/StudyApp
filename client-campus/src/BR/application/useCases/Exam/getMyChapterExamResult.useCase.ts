import type { StudentExamResult } from "../../../domain/entities/studentExamResult.interface";
import type { ExamRepository } from "../../../domain/services/exam.repository";

export class GetMyChapterExamResultUseCase {
  private readonly examRepository: ExamRepository;

  constructor(examRepository: ExamRepository) {
    this.examRepository = examRepository;
  }

  async execute(id_chapter: string): Promise<StudentExamResult> {
    return this.examRepository.getMyChapterExamResult(id_chapter);
  }
}
