import type { Role } from "../../../domain/entities/role.interface";
import type { RoleRepository } from "../../../domain/services/role.repository";

export class GetAllRolesUseCase {
  private repository: RoleRepository;
  constructor(repository: RoleRepository) {
    this.repository = repository;
  }
  execute(): Promise<Role[]> {
    return this.repository.getAll();
  }
}
