import type { StudentExamResult } from "../../../domain/entities/studentExamResult.interface";
import type { ExamRepository } from "../../../domain/services/exam.repository";

export class SubmitChapterExamUseCase {
  private readonly examRepository: ExamRepository;

  constructor(examRepository: ExamRepository) {
    this.examRepository = examRepository;
  }

  async execute(
    id_chapter: string,
    answers: string[],
  ): Promise<StudentExamResult> {
    return this.examRepository.submitChapterExam(id_chapter, answers);
  }
}
