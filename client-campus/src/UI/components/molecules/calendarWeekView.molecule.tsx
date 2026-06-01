import type React from "react";
import type { CalendarCell } from "../organisms/common/calendar.types";
import { formatSelectedDate } from "../organisms/common/calendar.utils";
import CalendarEventPill from "../atoms/calendarEventPill.atom";

interface CalendarWeekViewProps {
  days: CalendarCell[];
  onSelectDate: (isoDate: string) => void;
}

const CalendarWeekView: React.FC<CalendarWeekViewProps> = ({
  days,
  onSelectDate,
}) => {
  return (
    <div className="h-full overflow-y-clip rounded-2xl border border-lightBorder bg-lightPrimary shadow-sm dark:border-darkBorder dark:bg-darkPrimary">
      <div className="grid grid-cols-7 gap-px border-b border-lightBorder bg-lightDetail/40 px-4 py-4 dark:border-darkBorder dark:bg-darkAccent/15">
        {days.map((day) => (
          <button
            key={day.isoDate}
            type="button"
            onClick={() => onSelectDate(day.isoDate)}
            className={`rounded-xl px-2 py-3 text-center transition ${
              day.isSelected
                ? "bg-lightLink text-lightPrimary dark:bg-darkLink dark:text-darkPrimary"
                : "hover:bg-lightAccent/20 dark:hover:bg-darkAccent/20"
            }`}
          >
            <p className="font-sharetech text-[11px] uppercase tracking-[0.18em]">
              {new Intl.DateTimeFormat("es-AR", {
                weekday: "short",
              }).format(new Date(day.isoDate))}
            </p>
            <p className="mt-1 font-pixelify text-2xl">{day.dayNumber}</p>
            <p className="mt-2 font-sharetech text-xs opacity-80">
              {day.events.length} evento{day.events.length === 1 ? "" : "s"}
            </p>
          </button>
        ))}
      </div>

      <div className="grid gap-3 p-4 lg:grid-cols-7">
        {days.map((day) => (
          <button
            key={day.isoDate}
            type="button"
            onClick={() => onSelectDate(day.isoDate)}
            className={`rounded-2xl border p-3 text-left ${
              day.isSelected
                ? "border-lightLink bg-lightLink/10 dark:border-darkLink dark:bg-darkLink/10"
                : "border-lightBorder bg-lightSecondary/20 dark:border-darkBorder dark:bg-darkSecondary/20"
            }`}
          >
            <p className="font-sharetech text-xs uppercase tracking-[0.18em] text-lightText/70 dark:text-darkText/70">
              {formatSelectedDate(new Date(day.isoDate))}
            </p>

            {day.events.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {day.events.map((event) => (
                  <li key={event.id}>
                    <CalendarEventPill
                      event={event}
                      className="block rounded-lg bg-lightPrimary px-3 py-2 text-sm dark:bg-darkPrimary"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 font-sharetech text-sm text-lightText/60 dark:text-darkText/60">
                Sin eventos.
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CalendarWeekView;
