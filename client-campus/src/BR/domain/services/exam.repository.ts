import type { ExamQuestion } from "../entities/exam.interface";
import type { StudentExamResult } from "../entities/studentExamResult.interface";

export interface ExamRepository {
  generateByChapterId(
    id_chapter: string,
    force?: boolean,
  ): Promise<ExamQuestion[]>;
  getChapterExam(id_chapter: string): Promise<ExamQuestion[]>;
  submitChapterExam(
    id_chapter: string,
    answers: string[],
  ): Promise<StudentExamResult>;
  getMyChapterExamResult(id_chapter: string): Promise<StudentExamResult>;
}
