export interface ExamQuestionResponseDto {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface ExamResponseDto {
  id_exam: string;
  id_chapter: string;
  questions: ExamQuestionResponseDto[];
}
