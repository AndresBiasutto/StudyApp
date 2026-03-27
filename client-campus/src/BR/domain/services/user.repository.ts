import type { User } from "../entities/user.interface";

export interface UserRepository {
  authUser(token: string): Promise<User>;
  authMe(): Promise<User>;
  getAll(): Promise<User[]>;
  getListed(): Promise<User[]>;
  getById(id: string): Promise<User>;
  getUserData(id: string): Promise<User>;
  create(User: Omit<User, "id">): Promise<User>;
  update(id: string, User: Partial<User>): Promise<User>;
  updateRole(id_user: string, id_role: string): Promise<User>;
  delete(id: string): Promise<void>;
}
