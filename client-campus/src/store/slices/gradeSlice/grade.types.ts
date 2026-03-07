import type { Grade } from "../../../BR/domain/entities/grade.interface";

export interface GradeState {
  items: Grade[];
  selected: Grade|undefined;
  loading: boolean;
  error: string | null;
}


