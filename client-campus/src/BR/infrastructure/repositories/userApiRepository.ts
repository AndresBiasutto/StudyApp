import type { AxiosResponse } from "axios";
import type {
  LoginCredentials,
  RegisterCredentials,
} from "../../domain/entities/authCredentials.interface";
import type { User } from "../../domain/entities/user.interface";
import type { UserRepository } from "../../domain/services/user.repository";
import { httpClient } from "../services/httpClient";
import type { AuthUserDTO } from "../../../UI/interfaces/authUserDTO";

export class UserApiRepository implements UserRepository {
  async updateRole(id_user: string, id_role: string): Promise<User> {
    const { data } = await httpClient.put<User>(`/users/updateRole/${id_user}`, {
      id_role,
    });
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
  async authMe(): Promise<User> {
    const { data } = await httpClient.get<User>("/users/me");
    return data;
  }
  async login(credentials: LoginCredentials): Promise<User> {
    const { data } = await httpClient.post<User>("/users/login", credentials);
    return data;
  }
  async register(credentials: RegisterCredentials): Promise<User> {
    const { data } = await httpClient.post<User>("/users/register", credentials);
    return data;
  }
  async getAll(): Promise<User[]> {
    const { data } = await httpClient.get<User[]>("/users");
    return data;
  }
  async getAllTeachers(): Promise<User[]> {
    const { data } = await httpClient.get<User[]>("/users/allteachers");
    return data;
  }
  async getAllStudents(): Promise<User[]> {
    const { data } = await httpClient.get<User[]>("/users/allStudents");
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
    const { data } = await httpClient.get<User>(`/users/liData/${id_user}`);
    return data;
  }
  async create(user: Omit<User, "id_user">): Promise<User> {
    const { data } = await httpClient.post<User>("/users", user);
    return data;
  }
  async update(_id_user: string, _user: Partial<User>): Promise<User> {
    void _id_user;
    void _user;
    throw new Error(
      "La API actual no expone una ruta general para actualizar usuarios.",
    );
  }
  async delete(id_user: string): Promise<void> {
    await httpClient.delete(`/users/${id_user}`);
  }
}
