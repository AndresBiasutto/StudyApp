import type { Chapter } from "./chapter.interface";

export interface Unit {
  id: number;
  name: string;
  description: string;
  order: number;
  createdChapters: Chapter[];
}