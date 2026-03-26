import type { UnitRepository } from "../../../domain/services/unit.repository";

export class DeleteUnitUseCase {
  private repository: UnitRepository;

  constructor(repository: UnitRepository) {
    this.repository = repository;
  }

  execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
