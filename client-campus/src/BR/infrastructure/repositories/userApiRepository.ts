import type { AxiosResponse } from "axios";
import type { User } from "../../domain/entities/user.interface";
import type { UserRepository } from "../../domain/services/user.repository";
import { httpClient } from "../services/httpClient";
import type { AuthUserDTO } from "../../../UI/interfaces/authUserDTO";

export class UserApiRepository implements UserRepository {
  async updateRole(id_user: string, id_role: string): Promise<User> {
    const { data } = await httpClient.put<User>(`/users/updateRole/${id_user}`, {id_role});
    return data;
  }
  async authUser(token: string): Promise<User> {
    const { data } = await httpClient.post<
      User,
      AxiosResponse<User>,
      AuthUserDTO
    >("users/authUser", { token });
    return data;
  }
  async authMe(token: string): Promise<User> {
    const { data } = await httpClient.get<User>("users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
  async getAll(): Promise<User[]> {
    const { data } = await httpClient.get<User[]>("/users");
    return data;
  }
  async getListed(): Promise<User[]> {
    const { data } = await httpClient.get<User[]>("/users/liData");
    return data;
  }
  async getUserData(id_user: string): Promise<User> {
    const { data } = await httpClient.get<User>(`/users/liData/${id_user}`);
    return data;
  }
  async getById(id_user: string): Promise<User> {
    const { data } = await httpClient.get<User>(`/users/${id_user}`);
    return data;
  }
  async create(user: Omit<User, "id">): Promise<User> {
    const { data } = await httpClient.post<User>("/users", user);
    return data;
  }
  async update(id_user: string, user: Partial<User>): Promise<User> {
    const { data } = await httpClient.put<User>(`/users/${id_user}`, user);
    return data;
  }
  async delete(id_user: string): Promise<void> {

    await httpClient.delete(`/users/${id_user}`);
  }
}
