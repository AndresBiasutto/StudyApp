import type { Chapter } from "../../../BR/domain/entities/chapter.interface";

export interface ChapterState {
  items: Chapter[];
  selected: Chapter | undefined;
  loading: boolean;
  error: string | null;
}
