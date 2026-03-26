import type { Unit } from "../../../domain/entities/unit.interface";
import type { UnitRepository } from "../../../domain/services/unit.repository";

export class CreateUnitUseCase {
  private repository: UnitRepository;

  constructor(repository: UnitRepository) {
    this.repository = repository;
  }

  execute(unit: Partial<Unit>): Promise<Unit> {
    return this.repository.create(unit);
  }
}
