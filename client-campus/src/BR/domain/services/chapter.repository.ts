import type { Chapter } from "../entities/chapter.interface";

export interface ChapterRepository {
  getAll(): Promise<Chapter[]>;
  getById(id: string): Promise<Chapter>;
  create(chapter: Partial<Chapter>): Promise<Chapter>;
  update(id: string, chapter: Partial<Chapter>): Promise<Chapter>;
  delete(id: string): Promise<void>;
}
