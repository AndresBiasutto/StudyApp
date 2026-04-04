import type { ExamQuestion } from "../../domain/entities/exam.interface";
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
}
