import type { Chapter } from "./chapter";

export interface Unit {
  id: number;
  name: string;
  description: string;
  unitOrder: number;
  chapters: Chapter[];
}