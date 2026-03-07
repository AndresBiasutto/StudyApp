import type { User } from "../../../domain/entities/user.interface";
import type { UserRepository } from "../../../domain/services/user.repository";


export class AuthUser {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  execute(token: string): Promise<User> {
    return this.repository.authUser(token);
  }
}