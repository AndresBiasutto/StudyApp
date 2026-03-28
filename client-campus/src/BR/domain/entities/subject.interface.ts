import type { Unit } from "./unit.interface";
import type { Grade } from "./grade.interface";
import type { Role } from "./role.interface";
import type { User } from "./user.interface";

export interface Subject {
  id_subject: string;
  name: string;
  description?: string;
  imageUrl?: string;
  Grade: Grade;
  Role: Role;
  createdUnits?: Unit[] | [];
  creator?: User;
  students?: User[] | [];
  student_ids?: string[];
}
