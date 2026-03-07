import type { Grade } from "../../domain/entities/grade.interface";
import type { GradeRepository } from "../../domain/services/grade.repository";
import { httpClient } from "../services/httpClient";

export class GradeApiRepository implements GradeRepository {
  async getAll(): Promise<Grade[]> {
    const { data } = await httpClient.get<Grade[]>("/grades");
    return data;
  }
}
