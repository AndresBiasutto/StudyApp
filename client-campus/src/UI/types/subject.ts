import type { Unit } from "./unit";

export interface Subject {
  id: number;
  name: string;
  description: string;
  units: Unit[];
}