import type { Unit } from "../../../domain/entities/unit.interface";
import type { UnitRepository } from "../../../domain/services/unit.repository";

export class UpdateUnitUseCase {
  private repository: UnitRepository;

  constructor(repository: UnitRepository) {
    this.repository = repository;
  }

  execute(id: string, unit: Partial<Unit>): Promise<Unit> {
    return this.repository.update(id, unit);
  }
}
