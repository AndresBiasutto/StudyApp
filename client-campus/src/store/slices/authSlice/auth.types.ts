import type { User } from "../../../BR/domain/entities/user.interface";

export interface AuthState {
  token: string | null;
  selected: User | null;
  loading: boolean;
  updatingProfile: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
