import type { Unit } from "./unit.interface";

export interface Subject {
  id: number;
  name: string;
  description: string;
  units: Unit[];
  subjectState: "pending" | "published";
}