import type { Chapter } from "../../BR/domain/entities/chapter.interface";

export interface creatorCard {
  title: string;
  text: string ;
  unitOrder: number ;
  createChapter?: React.MouseEventHandler<HTMLButtonElement>;
  chapters?: Chapter[];
}
