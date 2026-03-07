import type { Subject } from "../../domain/entities/subject.interface";
import type { SubjectRepository } from "../../domain/services/subjectRepository";
import { httpClient } from "../services/httpClient";

export class SubjectApiRepository implements SubjectRepository {
  
  async getAll(): Promise<Subject[]> {
    const { data } = await httpClient.get<Subject[]>("/subjects");
    return data;
  }

  async getById(id: string): Promise<Subject> {
    const { data } = await httpClient.get<Subject>(`/subjects/${id}`);
    return data;
  }

  async create(subject: Partial<Subject> ): Promise<Subject> {
    const { data } = await httpClient.post<Subject>("/subjects", subject);
    return data;
  }

  async update(id: string, subject: Partial<Subject>): Promise<Subject> {
    const { data } = await httpClient.put<Subject>(`/subjects/${id}`, subject);
    return data;
  }

  async delete(id: string): Promise<void> {
    await httpClient.delete(`/subjects/${id}`);
  }
}
