import type { ExamQuestion } from "../../../BR/domain/entities/exam.interface";
import type { StudentExamResult } from "../../../BR/domain/entities/studentExamResult.interface";

export interface StudentExamState {
  questions: ExamQuestion[];
  selectedAnswers: Record<number, string>;
  loadingExam: boolean;
  submitting: boolean;
  result: StudentExamResult | null;
  error: string | null;
  currentChapterId: string | null;
}
