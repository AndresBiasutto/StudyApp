export interface ExamResultResponseDto {
  id_exam_result: string;
  id_exam: string;
  id_user: string;
  id_subject: string;
  id_chapter: string;
  score: number;
  total_questions: number;
  displayScore: string;
}
