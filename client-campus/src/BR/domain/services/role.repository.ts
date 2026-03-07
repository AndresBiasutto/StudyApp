import type { Role } from "../entities/role.interface";

export interface RoleRepository {
  getAll(): Promise<Role[]>;
  getById(id: string): Promise<Role>;
}
