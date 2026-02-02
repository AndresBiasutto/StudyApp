import type { User } from "../entities/user.interface";

export interface UserRepository {
  getAll(): Promise<User[]>;
  getListed(): Promise<User[]>;
  getById(id: string): Promise<User>;
  getUserData(id: string): Promise<User>;
  create(User: Omit<User, "id">): Promise<User>;
  update(id: string, User: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
}
