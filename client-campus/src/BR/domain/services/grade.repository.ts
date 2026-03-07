import type { Grade } from "../entities/grade.interface";

export interface GradeRepository {
  getAll(): Promise<Grade[]>;
}
