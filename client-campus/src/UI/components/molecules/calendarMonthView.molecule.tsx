import type React from "react";
import type { CalendarCell } from "../organisms/common/calendar.types";
import CalendarDateBadge from "../atoms/calendarDateBadge.atom";
import CalendarEventPill from "../atoms/calendarEventPill.atom";

interface CalendarMonthViewProps {
  cells: CalendarCell[];
  onSelectDate: (isoDate: string) => void;
}

const CalendarMonthView: React.FC<CalendarMonthViewProps> = ({
  cells,
  onSelectDate,
}) => {
  return (
    <div className="h-full overflow-hidden rounded-2xl border border-lightBorder bg-lightPrimary shadow-sm dark:border-darkBorder dark:bg-darkPrimary">
      <div className="grid grid-cols-7 border-b border-lightBorder bg-lightDetail/40 dark:border-darkBorder dark:bg-darkAccent/15">
        {["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"].map((day) => (
          <div
            key={day}
            className="py-3 text-center font-sharetech text-xs uppercase tracking-[0.22em] text-lightText/75 dark:text-darkText/75"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="hidden grid-cols-7 grid-rows-6 gap-px bg-lightBorder/60 lg:grid dark:bg-darkBorder/60">
        {cells.map((cell) => (
          <button
            key={cell.isoDate}
            type="button"
            onClick={() => onSelectDate(cell.isoDate)}
            className={`min-h-32 px-3 py-3 text-left transition ${
              cell.isCurrentMonth
                ? "bg-lightPrimary hover:bg-lightDetail/25 dark:bg-darkPrimary dark:hover:bg-darkAccent/20"
                : "bg-lightDetail/35 text-lightText/45 hover:bg-lightDetail/55 dark:bg-darkSecondary/35 dark:text-darkText/45 dark:hover:bg-darkSecondary/55"
            }`}
          >
            <CalendarDateBadge
              dayNumber={cell.dayNumber}
              isSelected={cell.isSelected}
              isToday={cell.isToday}
            />

            <ol className="mt-3 space-y-1.5">
              {cell.events.slice(0, 2).map((event) => (
                <li key={event.id}>
                  <CalendarEventPill event={event} />
                </li>
              ))}

              {cell.events.length > 2 && (
                <li className="font-sharetech text-xs text-lightLink dark:text-darkLink">
                  +{cell.events.length - 2} mas
                </li>
              )}
            </ol>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-lightBorder/60 lg:hidden dark:bg-darkBorder/60">
        {cells.map((cell) => (
          <button
            key={cell.isoDate}
            type="button"
            onClick={() => onSelectDate(cell.isoDate)}
            className={`flex h-16 flex-col px-2 py-2 transition ${
              cell.isCurrentMonth
                ? "bg-lightPrimary hover:bg-lightDetail/25 dark:bg-darkPrimary dark:hover:bg-darkAccent/20"
                : "bg-lightDetail/35 text-lightText/45 hover:bg-lightDetail/55 dark:bg-darkSecondary/35 dark:text-darkText/45 dark:hover:bg-darkSecondary/55"
            }`}
          >
            <CalendarDateBadge
              dayNumber={cell.dayNumber}
              isSelected={cell.isSelected}
              isToday={cell.isToday}
              compact
            />

            <span className="mt-auto flex flex-wrap justify-start gap-1">
              {cell.events.slice(0, 3).map((event) => (
                <span
                  key={event.id}
                  className="h-1.5 w-1.5 rounded-full bg-lightLink dark:bg-darkLink"
                />
              ))}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CalendarMonthView;
