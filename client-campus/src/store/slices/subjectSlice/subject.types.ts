import type { Subject } from "../../../BR/domain/entities/subject.interface";

export interface SubjectState {
  items: Subject[];
  selected: Subject | undefined;
  loadingList: boolean;
  loadingSelected: boolean;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  error: string | null;
}


