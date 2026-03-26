import type { Chapter } from "./chapter.interface";

export interface Unit {
  id: number;
  name: string;
  description: string;
  order: number;
  createdChapters: Chapter[];
  id_unit?: string;
  unitOrder?: number;
  chapters: Chapter[];
  id_subject?: string;
}
