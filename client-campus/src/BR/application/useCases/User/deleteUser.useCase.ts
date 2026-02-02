// DeleteSubject.useCase.ts

import type { UserRepository } from "../../../domain/services/user.repository";


export class DeleteUserUseCase {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  execute(id_user: string): Promise<void> {
    return this.repository.delete(id_user);
  }
}
