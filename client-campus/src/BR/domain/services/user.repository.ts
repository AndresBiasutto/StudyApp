import type { User } from "../entities/user.interface";
import type {
  LoginCredentials,
  RegisterCredentials,
} from "../entities/authCredentials.interface";

export interface UserRepository {
  authUser(token: string): Promise<User>;
  authMe(): Promise<User>;
  login(credentials: LoginCredentials): Promise<User>;
  register(credentials: RegisterCredentials): Promise<User>;
  getAll(): Promise<User[]>;
  getAllTeachers(): Promise<User[]>;
  getAllStudents(): Promise<User[]>;
  getListed(): Promise<User[]>;
  getById(id: string): Promise<User>;
  getUserData(id: string): Promise<User>;
  create(user: Omit<User, "id_user">): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User>;
  updateRole(id_user: string, id_role: string): Promise<User>;
  delete(id: string): Promise<void>;
}
