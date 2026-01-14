import type { Subject } from "../entities/subject.interface";

export interface SubjectRepository {
  getAll(): Promise<Subject[]>;
  getById(id: number): Promise<Subject>;
  create(subject: Omit<Subject, "id">): Promise<Subject>;
  update(id: number, subject: Partial<Subject>): Promise<Subject>;
  delete(id: number): Promise<void>;
}
