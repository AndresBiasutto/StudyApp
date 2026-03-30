import type { Chapter } from "../../BR/domain/entities/chapter.interface";

export interface creatorCard {
  id: string | undefined;
  title: string | null | undefined;
  text: string | null | undefined;
  unitOrder: number | null | undefined;
  createChapter?: React.MouseEventHandler<HTMLButtonElement>;
  chapters?: Chapter[];
}
