import { UUID } from "crypto";
import type { Unit } from "./unit.interface";

export interface Subject {
  id_subject: UUID;
  name: string;
  description: string;
  imageUrl: string;

  units: Unit[];
  subjectState?: "pending" | "published";
}
