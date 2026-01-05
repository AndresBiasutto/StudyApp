import type { Chapter } from "./chapter";
import type { Subject } from "./subject";

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
