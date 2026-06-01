import type React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { VIEW_LABELS } from "../organisms/common/calendar.utils";
import type { CalendarView } from "../organisms/common/calendar.types";

interface CalendarToolbarProps {
  selectedView: CalendarView;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onSelectView: (view: CalendarView) => void;
  onPrevious: () => void;
  onToday: () => void;
  onNext: () => void;
}

const CalendarToolbar: React.FC<CalendarToolbarProps> = ({
  selectedView,
  menuOpen,
  onToggleMenu,
  onSelectView,
  onPrevious,
  onToday,
  onNext,
}) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex items-center rounded-xl border border-lightBorder bg-lightPrimary dark:border-darkBorder dark:bg-darkPrimary">
        <button
          type="button"
          onClick={onPrevious}
          className="flex h-11 w-11 items-center justify-center rounded-l-xl text-lightText transition hover:bg-lightAccent/35 dark:text-darkText dark:hover:bg-darkAccent/35"
          aria-label="Anterior"
        >
          <FiChevronLeft />
        </button>

        <button
          type="button"
          onClick={onToday}
          className="border-x border-lightBorder px-4 py-2 font-pixelify text-sm text-lightText transition hover:bg-lightAccent/25 dark:border-darkBorder dark:text-darkText dark:hover:bg-darkAccent/25"
        >
          Hoy
        </button>

        <button
          type="button"
          onClick={onNext}
          className="flex h-11 w-11 items-center justify-center rounded-r-xl text-lightText transition hover:bg-lightAccent/35 dark:text-darkText dark:hover:bg-darkAccent/35"
          aria-label="Siguiente"
        >
          <FiChevronRight />
        </button>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={onToggleMenu}
          className="flex min-w-44 items-center justify-between rounded-xl border border-lightBorder bg-lightPrimary px-4 py-3 font-sharetech text-sm text-lightText shadow-sm transition hover:bg-lightAccent/25 dark:border-darkBorder dark:bg-darkPrimary dark:text-darkText dark:hover:bg-darkAccent/25"
        >
          <span>{VIEW_LABELS[selectedView]}</span>
          <span className={`transition ${menuOpen ? "rotate-180" : ""}`}>v</span>
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-14 z-20 w-full rounded-xl border border-lightBorder bg-lightPrimary p-2 shadow-lg dark:border-darkBorder dark:bg-darkPrimary">
            {(Object.entries(VIEW_LABELS) as [CalendarView, string][]).map(
              ([viewKey, label]) => (
                <button
                  key={viewKey}
                  type="button"
                  onClick={() => onSelectView(viewKey)}
                  className={`mb-1 block w-full rounded-lg px-3 py-2 text-left font-sharetech text-sm transition last:mb-0 ${
                    selectedView === viewKey
                      ? "bg-lightLink text-lightPrimary dark:bg-darkLink dark:text-darkPrimary"
                      : "text-lightText hover:bg-lightAccent/25 dark:text-darkText dark:hover:bg-darkAccent/25"
                  }`}
                >
                  {label}
                </button>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarToolbar;
