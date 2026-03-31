import type { Chapter } from "../../domain/entities/chapter.interface";
import type { ChapterRepository } from "../../domain/services/chapter.repository";
import { httpClient } from "../services/httpClient";

export class ChapterApiRepository implements ChapterRepository {
  async getAll(): Promise<Chapter[]> {
    const { data } = await httpClient.get<Chapter[]>("/chapters");
    return data;
  }

  async getById(id: string): Promise<Chapter> {
    const { data } = await httpClient.get<Chapter>(`/chapters/${id}`);
    return data;
  }

  async create(chapter: Partial<Chapter>): Promise<Chapter> {
    const { data } = await httpClient.post<Chapter>("/chapters", chapter);
    return data;
  }

  async update(id: string, chapter: Partial<Chapter>): Promise<Chapter> {
    const { data } = await httpClient.put<Chapter>(`/chapters/${id}`, chapter);
    return data;
  }

  async saveDraft(id_chapter: string, chapter: Partial<Chapter>): Promise<Chapter> {
    const { data } = await httpClient.put<Chapter>(
      `/chapters/${id_chapter}/draft`,
      chapter
    );
    return data;
  }

  async publish(id_chapter: string, chapter: Partial<Chapter>): Promise<Chapter> {
    const { data } = await httpClient.put<Chapter>(
      `/chapters/${id_chapter}/publish`,
      chapter
    );
    return data;
  }

  async delete(id: string): Promise<void> {
    await httpClient.delete(`/chapters/${id}`);
  }
}
