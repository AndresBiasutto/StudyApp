import type React from "react";
import type { YearMonthSummary } from "../organisms/common/calendar.types";

interface CalendarYearViewProps {
  summary: YearMonthSummary[];
  onSelectDate: (isoDate: string) => void;
}

const CalendarYearView: React.FC<CalendarYearViewProps> = ({
  summary,
  onSelectDate,
}) => {
  const toIsoDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {summary.map((month) => (
        <button
          key={month.monthDate.toISOString()}
          type="button"
          onClick={() => onSelectDate(toIsoDate(month.monthDate))}
          className={`rounded-2xl border p-4 text-left shadow-sm transition ${
            month.isCurrentMonth
              ? "border-lightLink bg-lightPrimary dark:border-darkLink dark:bg-darkPrimary"
              : "border-lightBorder bg-lightPrimary hover:bg-lightDetail/30 dark:border-darkBorder dark:bg-darkPrimary dark:hover:bg-darkAccent/15"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <h4 className="font-pixelify text-2xl capitalize text-lightText dark:text-darkText">
              {month.monthLabel}
            </h4>
            <span className="rounded-full bg-lightAccent/20 px-3 py-1 font-sharetech text-xs uppercase tracking-[0.14em] text-lightText dark:bg-darkAccent/20 dark:text-darkText">
              {month.eventCount} evento{month.eventCount === 1 ? "" : "s"}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {month.highlightedDays.length > 0 ? (
              month.highlightedDays.map((day) => (
                <span
                  key={`${month.monthLabel}-${day}`}
                  className="rounded-full bg-lightLink/15 px-2.5 py-1 font-sharetech text-xs text-lightLink dark:bg-darkLink/15 dark:text-darkLink"
                >
                  {day}
                </span>
              ))
            ) : (
              <span className="font-sharetech text-sm text-lightText/60 dark:text-darkText/60">
                Sin fechas destacadas.
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default CalendarYearView;
