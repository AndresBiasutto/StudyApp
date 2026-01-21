import type { Chapter } from "../UI/types/chapter";
import type { Subject } from "../UI/types/subject";

export interface subjectSidebar{
  subject: Subject;
  openUnit: number | null;
  activeUnit: number | null;
  activeChapter: number | null;
  sidebarOpen: boolean;
  onToggleUnit: (unitId: number) => void;
  onSelectChapter: (
    unitId: number,
    chapterIndex: number,
    chapter: Chapter
  ) => void;
  onCloseSidebar: () => void;

}
