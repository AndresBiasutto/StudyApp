import { repositoryFactory } from "../../../infrastructure/factories/repositoryFactory";
import { AuthMe } from "./authMe.useCase";
import { AuthUser } from "./authUser.useCase";
import { CreateUserUseCase } from "./createUser.useCase";
import { DeleteUserUseCase } from "./deleteUser.useCase";
import { GetListedUsersUseCase } from "./getListedUsers.useCase";
import { GetUserByIdUseCase } from "./getUserById.useCase";
import { GetUserData } from "./getUserData.useCase";
import { GetUsersUseCase } from "./getUsers.useCase";
import { UpdateRoleUseCase } from "./updateRole.useCase";
import { UpdateUserUseCase } from "./updateUser.useCase";

let cachedUserUseCases: {
  authMe: AuthMe;
  authUser: AuthUser;
  createUser: CreateUserUseCase;
  deleteUser: DeleteUserUseCase;
  getListedUsers: GetListedUsersUseCase;
  getUserById: GetUserByIdUseCase;
  getUserData: GetUserData;
  getUsers: GetUsersUseCase;
  updateRole: UpdateRoleUseCase;
  updateUser: UpdateUserUseCase;
} | null = null;

export const getUserUseCases = () => {
  if (!cachedUserUseCases) {
    const repository = repositoryFactory.getUserRepository();
    cachedUserUseCases = {
      authMe: new AuthMe(repository),
      authUser: new AuthUser(repository),
      createUser: new CreateUserUseCase(repository),
      deleteUser: new DeleteUserUseCase(repository),
      getListedUsers: new GetListedUsersUseCase(repository),
      getUserById: new GetUserByIdUseCase(repository),
      getUserData: new GetUserData(repository),
      getUsers: new GetUsersUseCase(repository),
      updateRole: new UpdateRoleUseCase(repository),
      updateUser: new UpdateUserUseCase(repository),
    };
  }

  return cachedUserUseCases;
};
