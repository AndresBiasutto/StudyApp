import type { Unit } from "../entities/unit.interface";

export interface UnitRepository {
  getAll(): Promise<Unit[]>;
  getById(id: string): Promise<Unit>;
  create(unit: Partial<Unit>): Promise<Unit>;
  update(id: string, unit: Partial<Unit>): Promise<Unit>;
  delete(id: string): Promise<void>;
}
