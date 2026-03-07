import type { Role } from "../../../BR/domain/entities/role.interface";

export interface RoleState {
  items: Role[];
  selected: Role|undefined;
  loading: boolean;
  error: string | null;
}


