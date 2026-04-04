import type { ExamQuestion } from "../entities/exam.interface";

export interface ExamRepository {
  generateByChapterId(
    id_chapter: string,
    force?: boolean,
  ): Promise<ExamQuestion[]>;
}
