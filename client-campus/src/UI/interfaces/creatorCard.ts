export interface creatorCard {
  title: string;
  text: string ;
  unitOrder: number ;
  createChapter?: React.MouseEventHandler<HTMLButtonElement>;
  chapters?: {
    id: number;
    name: string;
    chapterOrder: number;
    description: string;
  }[];
}
