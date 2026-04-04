import type { ExamQuestion } from "../../../BR/domain/entities/exam.interface";

export interface ExamState {
  generated: ExamQuestion[];
  currentChapterId: string | null;
  loadingGenerate: boolean;
  saving: boolean;
  error: string | null;
}
