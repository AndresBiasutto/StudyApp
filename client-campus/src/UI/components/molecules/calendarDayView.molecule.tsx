import type React from "react";
import { FiClock } from "react-icons/fi";
import type { CalendarEntry } from "../../../BR/domain/entities/calendar.interface";
import { DAY_SLOTS, formatDayTitle } from "../organisms/common/calendar.utils";

interface CalendarDayViewProps {
  selectedDate: Date;
  selectedHour?: string;
  scheduledEvents: CalendarEntry[];
  unscheduledEvents: CalendarEntry[];
  onSelectTimeSlot: (isoDate: string, hour: string) => void;
}

const CalendarDayView: React.FC<CalendarDayViewProps> = ({
  selectedDate,
  selectedHour,
  scheduledEvents,
  unscheduledEvents,
  onSelectTimeSlot,
}) => {
  const toIsoDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-lightBorder bg-lightPrimary shadow-sm dark:border-darkBorder dark:bg-darkPrimary">
      <div className="border-b border-lightBorder px-5 py-4 dark:border-darkBorder">
        <p className="font-sharetech text-xs uppercase tracking-[0.18em] text-lightText/70 dark:text-darkText/70">
          Jornada seleccionada
        </p>
        <h4 className="mt-1 font-pixelify text-2xl text-lightText dark:text-darkText">
          {formatDayTitle(selectedDate)}
        </h4>
        {selectedHour && (
          <p className="mt-2 font-sharetech text-sm text-lightLink dark:text-darkLink">
            Hora seleccionada: {selectedHour}
          </p>
        )}
      </div>

      {unscheduledEvents.length > 0 && (
        <div className="border-b border-lightBorder px-4 py-4 dark:border-darkBorder">
          <p className="font-sharetech text-xs uppercase tracking-[0.18em] text-lightText/70 dark:text-darkText/70">
            Sin horario asignado
          </p>
          <div className="mt-3 space-y-2">
            {unscheduledEvents.map((event) => (
              <div
                key={event.id}
                className="rounded-xl border border-lightBorder bg-lightSecondary/25 px-3 py-3 dark:border-darkBorder dark:bg-darkSecondary/25"
              >
                <p className="font-sharetech text-sm text-lightText dark:text-darkText">
                  {event.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="divide-y divide-lightBorder dark:divide-darkBorder">
        {DAY_SLOTS.map((slot) => {
          const slotEvents = scheduledEvents.filter((event) => event.hour === slot);

          return (
            <button
              key={slot}
              type="button"
              onClick={() => onSelectTimeSlot(toIsoDate(selectedDate), slot)}
              className={`grid w-full grid-cols-[5.5rem_minmax(0,1fr)] gap-4 px-4 py-4 text-left transition hover:bg-lightDetail/20 dark:hover:bg-darkAccent/10 ${
                selectedHour === slot ? "bg-lightLink/10 dark:bg-darkLink/10" : ""
              }`}
            >
              <div className="flex items-start gap-2">
                <FiClock className="mt-0.5 text-lightLink dark:text-darkLink" />
                <span className="font-sharetech text-sm text-lightText dark:text-darkText">
                  {slot}
                </span>
              </div>

              <div>
                {slotEvents.length > 0 ? (
                  <div className="space-y-2">
                    {slotEvents.map((event) => (
                      <div
                        key={event.id}
                        className="rounded-xl border border-lightBorder bg-lightSecondary/25 px-3 py-3 dark:border-darkBorder dark:bg-darkSecondary/25"
                      >
                        <p className="font-sharetech text-sm text-lightText dark:text-darkText">
                          {event.title}
                        </p>
                        {event.text && (
                          <p className="mt-2 font-sharetech text-xs text-lightText/70 dark:text-darkText/70">
                            {event.text}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-lightBorder px-3 py-3 dark:border-darkBorder">
                    <p className="font-sharetech text-sm text-lightText/60 dark:text-darkText/60">
                      Sin actividades programadas.
                    </p>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarDayView;
