import type { Subject } from "../../../BR/domain/entities/subject.interface";

export interface SubjectState {
  items: Subject[];
  selected: Subject|undefined;
  loading: boolean;
  error: string | null;
}


