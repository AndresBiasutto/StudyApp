import type { ExamQuestion } from "../../domain/entities/exam.interface";
import type { StudentExamResult } from "../../domain/entities/studentExamResult.interface";
import type { ExamRepository } from "../../domain/services/exam.repository";
import { httpClient } from "../services/httpClient";

export class ExamApiRepository implements ExamRepository {
  private static readonly EXAM_GENERATION_TIMEOUT_MS = 130000;

  async generateByChapterId(
    id_chapter: string,
    force = false,
  ): Promise<ExamQuestion[]> {
    const query = force ? "?force=true" : "";
    const { data } = await httpClient.get<ExamQuestion[]>(
      `/ai/multiple-choise/${id_chapter}${query}`,
      {
        timeout: ExamApiRepository.EXAM_GENERATION_TIMEOUT_MS,
      },
    );

    return data;
  }

  async getChapterExam(id_chapter: string): Promise<ExamQuestion[]> {
    const { data } = await httpClient.get<ExamQuestion[]>(
      `/exams/chapter/${id_chapter}`,
    );

    return data;
  }

  async submitChapterExam(
    id_chapter: string,
    answers: string[],
  ): Promise<StudentExamResult> {
    const { data } = await httpClient.post<StudentExamResult>(
      `/exam-results/chapter/${id_chapter}`,
      { answers },
    );

    return data;
  }

  async getMyChapterExamResult(
    id_chapter: string,
  ): Promise<StudentExamResult> {
    const { data } = await httpClient.get<StudentExamResult>(
      `/exam-results/chapter/${id_chapter}/me`,
    );

    return data;
  }
}
