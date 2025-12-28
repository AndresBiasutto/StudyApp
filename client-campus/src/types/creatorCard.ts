export interface creatorCard {
  title: string;
  text: string | undefined;
  unitOrder: number | undefined;
  createChapter?: React.MouseEventHandler<HTMLButtonElement>;
  chapters: { id: number; name: string; chapterOrder: number }[] | undefined;
}
