import type { Chapter } from "../../BR/domain/entities/chapter.interface";
import type { Subject } from "../../BR/domain/entities/subject.interface";

export interface subjectSidebar{
  subject: Subject;
  openUnit: string | null;
  activeUnit: string | null;
  activeChapter: number | null;
  sidebarOpen: boolean;
  onToggleUnit: (unitId: string) => void;
  onSelectChapter: (
    unitId: string,
    chapterIndex: number,
    chapter: Chapter
  ) => void;
  onCloseSidebar: () => void;

}
