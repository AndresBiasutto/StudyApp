import type { User } from "../../../BR/domain/entities/user.interface";

export interface UserState {
  items: User[];
  teachers: User[];
  students: User[];
  selected: User | undefined;
  loadingList: boolean;
  loadingSelected: boolean;
  loadingTeachers: boolean;
  loadingStudents: boolean;
  creating: boolean;
  updating: boolean;
  updatingRole: boolean;
  deleting: boolean;
  error: string | null;
}


