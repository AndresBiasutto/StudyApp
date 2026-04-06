import type { LoginCredentials } from "../../../domain/entities/authCredentials.interface";
import type { User } from "../../../domain/entities/user.interface";
import type { UserRepository } from "../../../domain/services/user.repository";

export class LoginUseCase {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  execute(credentials: LoginCredentials): Promise<User> {
    return this.repository.login(credentials);
  }
}
