import type { User } from "../entities/user.interface";

export interface UserRepository {
  getAll(): Promise<User[]>;
  getById(id: number): Promise<User>;
  create(User: Omit<User, "id">): Promise<User>;
  update(id: number, User: Partial<User>): Promise<User>;
  delete(id: number): Promise<void>;
}
