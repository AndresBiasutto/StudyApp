import type { User } from "../../domain/entities/user.interface";
import type { UserRepository } from "../../domain/services/user.repository";
import { httpClient } from "../services/httpClient";

export class UserApiRepository implements UserRepository {
  
  async getAll(): Promise<User[]> {
    const { data } = await httpClient.get<User[]>("/users");
    return data;
  }

  async getById(id: number): Promise<User> {
    const { data } = await httpClient.get<User>(`/users/${id}`);
    return data;
  }

  async create(user: Omit<User, "id">): Promise<User> {
    const { data } = await httpClient.post<User>("/users", user);
    return data;
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    const { data } = await httpClient.put<User>(`/users/${id}`, user);
    return data;
  }

  async delete(id: number): Promise<void> {
    await httpClient.delete(`/users/${id}`);
  }
}
