import type { User } from "../../../BR/domain/entities/user.interface";

export interface UserState {
  items: User[];
  teachers: User[];
  students: User[];
  selected: User|undefined;
  loading: boolean;
  error: string | null;
}


