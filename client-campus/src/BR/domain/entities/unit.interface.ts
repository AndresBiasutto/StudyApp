import type { Chapter } from "./chapter.interface";

export interface Unit {
  id_unit: string;
  name: string;
  description?: string | null;
  order?: number | null;
  imageUrl?: string | null;
  createdChapters: Chapter[];
  id_subject?: string;
}
