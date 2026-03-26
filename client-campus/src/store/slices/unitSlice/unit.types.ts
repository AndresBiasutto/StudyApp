import type { Unit } from "../../../BR/domain/entities/unit.interface";

export interface UnitState {
  items: Unit[];
  selected: Unit | undefined;
  loading: boolean;
  error: string | null;
}
