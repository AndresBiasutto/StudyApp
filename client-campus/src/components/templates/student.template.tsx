import { useState } from "react";
import { subject } from "../../Data";
import SubjectSidebar from "../organisms/student/subjectSidebar.organism";
import type { Chapter } from "../../types/chapter";
import ChapterReader from "../organisms/student/chapterReader.organism";

const StudentDashboardT = () => {
  const [openUnit, setOpenUnit] = useState<number | null>(null);
  const [activeUnit, setActiveUnit] = useState<number | null>(1);
  const [activeChapter, setActiveChapter] = useState<number | null>(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(
    subject.units[0].chapters[0]
  );

  const toggleUnit = (id: number) => {
    setOpenUnit(openUnit === id ? null : id);
  };
  const handleSelectChapter = (
    unitId: number,
    chapterIndex: number,
    chapter: Chapter
  ) => {
    setActiveUnit(unitId);
    setActiveChapter(chapterIndex);
    setCurrentChapter(chapter);
    setSidebarOpen(false);
  };
  return (
    <div className="w-full flex">
      <SubjectSidebar
        subject={subject}
        openUnit={openUnit}
        activeUnit={activeUnit}
        activeChapter={activeChapter}
        sidebarOpen={sidebarOpen}
        onToggleUnit={toggleUnit}
        onSelectChapter={handleSelectChapter}
        onCloseSidebar={() => setSidebarOpen(false)}
      />
      <ChapterReader chapter={currentChapter} setSidebarOpen={() => setSidebarOpen(!sidebarOpen)} />
    </div>
  );
};

export default StudentDashboardT;
