import type React from "react";
import { FiCalendar } from "react-icons/fi";
import type { CalendarEntry } from "../../../BR/domain/entities/calendar.interface";

interface CalendarSidebarProps {
  selectedDateLabel: string;
  selectedEvents: CalendarEntry[];
  currentUserRole?: string | null;
  onCreate: () => void;
  onOpenEvent: (event: CalendarEntry) => void;
}

const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  selectedDateLabel,
  selectedEvents,
  currentUserRole,
  onCreate,
  onOpenEvent,
}) => {
  const canCreateEvents = currentUserRole === "teacher" || currentUserRole === "admin";

  return (
    <aside className="rounded-2xl border border-lightBorder bg-lightPrimary p-4 shadow-sm dark:border-darkBorder dark:bg-darkPrimary">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-lightLink/15 p-3 text-lightLink dark:bg-darkLink/15 dark:text-darkLink">
          <FiCalendar className="text-xl" />
        </div>
        <div>
          <h4 className="font-pixelify text-xl text-lightText dark:text-darkText">
            Eventos del dia
          </h4>
          <p className="font-sharetech text-xs uppercase tracking-[0.2em] text-lightText/70 dark:text-darkText/70">
            {selectedDateLabel}
          </p>
        </div>
      </div>

      {canCreateEvents && (
        <button
          type="button"
          onClick={onCreate}
          className="mt-4 w-full rounded-xl border border-dashed border-lightBorder px-4 py-3 text-left font-sharetech text-sm text-lightText transition hover:bg-lightAccent/15 dark:border-darkBorder dark:text-darkText dark:hover:bg-darkAccent/15"
        >
          Crear evento para esta fecha
        </button>
      )}

      <div className="mt-5">
        {selectedEvents.length > 0 ? (
          <ul className="space-y-3">
            {selectedEvents.map((event) => (
              <li key={event.id}>
                <button
                  type="button"
                  onClick={() => onOpenEvent(event)}
                  className="w-full rounded-xl border border-lightBorder bg-lightSecondary/35 px-3 py-3 text-left transition hover:bg-lightAccent/15 dark:border-darkBorder dark:bg-darkSecondary/35 dark:hover:bg-darkAccent/15"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-sharetech text-sm text-lightText dark:text-darkText">
                      {event.title}
                    </p>
                    {event.hour && (
                      <span className="rounded-full bg-lightLink/15 px-2 py-1 font-sharetech text-[11px] text-lightLink dark:bg-darkLink/15 dark:text-darkLink">
                        {event.hour}
                      </span>
                    )}
                  </div>
                  {event.text && (
                    <p className="mt-2 font-sharetech text-xs text-lightText/70 dark:text-darkText/70">
                      {event.text}
                    </p>
                  )}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-xl border border-dashed border-lightBorder px-4 py-6 text-center dark:border-darkBorder">
            <p className="font-sharetech text-sm text-lightText/70 dark:text-darkText/70">
              No hay eventos cargados para esta fecha.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default CalendarSidebar;
