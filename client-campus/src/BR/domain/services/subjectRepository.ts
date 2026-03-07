import type { Subject } from "../entities/subject.interface";

export interface SubjectRepository {
  getAll(): Promise<Subject[]>;
  getById(id: string): Promise<Subject>;
  create(subject: Partial<Subject> ): Promise<Subject>;
  update(id: string, subject: Partial<Subject>): Promise<Subject>;
  delete(id: string): Promise<void>;
}
