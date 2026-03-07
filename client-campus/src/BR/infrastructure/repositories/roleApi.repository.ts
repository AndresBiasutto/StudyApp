import type { Role } from "../../domain/entities/role.interface";
import type { RoleRepository } from "../../domain/services/role.repository";
import { httpClient } from "../services/httpClient";

export class RoleApiRepository implements RoleRepository {
  async getAll(): Promise<Role[]> {
    const { data } = await httpClient.get<Role[]>("/roles");
    return data;
  }
  async getById(id_role: string): Promise<Role> {
    const { data } = await httpClient.get<Role>(`/roles/${id_role}`);
    return data;
  }
}
