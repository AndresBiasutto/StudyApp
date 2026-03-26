import type { Chapter } from "../../BR/domain/entities/chapter.interface";

export interface creatorCard {
  id: string | undefined;
  title: string;
  text: string ;
  unitOrder: number ;
  createChapter?: React.MouseEventHandler<HTMLButtonElement>;
  chapters?: Chapter[];
}
