import { repositoryFactory } from "../../../infrastructure/factories/repositoryFactory";
import { GetAllRolesUseCase } from "./getAllRoles.useCase";

let cachedRoleUseCases: {
  getAllRoles: GetAllRolesUseCase;
} | null = null;

export const getRoleUseCases = () => {
  if (!cachedRoleUseCases) {
    const repository = repositoryFactory.getRoleRepository();
    cachedRoleUseCases = {
      getAllRoles: new GetAllRolesUseCase(repository),
    };
  }

  return cachedRoleUseCases;
};
