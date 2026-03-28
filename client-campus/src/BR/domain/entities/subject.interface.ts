import type { Unit } from "./unit.interface";
import type { Grade } from "./grade.interface";
import type { User } from "./user.interface";

export interface Subject {
  id_subject: string;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  Grade?: Grade | null;
  createdUnits?: Unit[];
  creator?: User | null;
  students?: User[];
  student_ids?: string[];
}
