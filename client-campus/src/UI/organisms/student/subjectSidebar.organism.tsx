import type { subjectSidebar } from "../../../interfaces/subjectSidebar";
import H1 from "../../atoms/h1.atom";

// interface Chapter {
//   chapterOrder: string;
//   name: string;
//   videoUrl: string;
//   text: string;
// }

// interface Unit {
//   id: number;
//   unitOrder: string;
//   name: string;
//   chapters: Chapter[];
// }

// interface Subject {
//   name: string;
//   description: string;
//   units: Unit[];
// }

// interface SubjectSidebarProps {
//   subject: Subject;

//   openUnit: number | null;
//   activeUnit: number | null;
//   activeChapter: number | null;
//   sidebarOpen: boolean;

//   onToggleUnit: (unitId: number) => void;
//   onSelectChapter: (unitId: number, chapterIndex: number, chapter: Chapter) => void;
//   onCloseSidebar: () => void;
// }

const SubjectSidebar: React.FC<subjectSidebar> = ({
  subject,
  openUnit,
  activeUnit,
  activeChapter,
  sidebarOpen,
  onToggleUnit,
  onSelectChapter,
  onCloseSidebar,
}) => {
  return (
    <>
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={onCloseSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed z-20 left-0 top-0 pt-12 p-6 w-64 min-h-screen
          bg-lightPrimary dark:bg-darkPrimary
          border-r border-lightBorder dark:border-darkBorder
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Nombre de la materia */}
        <H1 text={subject.name} />

        {/* Índice */}
        <nav className="flex flex-col gap-2 overflow-y-auto pr-2">
          {subject.units.map((unit) => (
            <div
              key={unit.id}
              className="border border-lightBorder dark:border-darkBorder rounded"
            >
              {/* Unidad */}
              <button
                onClick={() => onToggleUnit(unit.id)}
                className={`
                  w-full px-3 py-2 text-left font-sharetech text-sm transition
                  ${
                    activeUnit === unit.id
                      ? "bg-lightAccent dark:bg-darkAccent text-lightText dark:text-darkText"
                      : "text-lightText dark:text-darkText hover:bg-lightDetail dark:hover:bg-darkSecondary"
                  }
                `}
              >
                {unit.unitOrder} {unit.name}
              </button>

              {/* Capítulos */}
              {openUnit === unit.id && (
                <ul className="flex flex-col bg-lightDetail dark:bg-darkSecondary">
                  {unit.chapters.map((chapter, index) => (
                    <li
                      key={index}
                      onClick={() =>
                        onSelectChapter(unit.id, index, chapter)
                      }
                      className={`
                        px-4 py-2 text-xs font-sharetech cursor-pointer transition
                        ${
                          activeUnit === unit.id &&
                          activeChapter === index
                            ? "bg-lightSuccess dark:bg-darkSuccess text-lightText dark:text-darkText"
                            : "text-lightText dark:text-darkText hover:bg-lightAccent dark:hover:bg-darkAccent"
                        }
                      `}
                    >
                      {chapter.chapterOrder} {chapter.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </aside>
      
    </>
  );
};

export default SubjectSidebar;
