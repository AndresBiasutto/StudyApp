import { useMemo, useState } from "react";
import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
} from "react-icons/fi";

type CalendarView = "day" | "week" | "month" | "year";

interface CalendarEventMap {
  [isoDate: string]: string[];
}

interface CalendarCell {
  isoDate: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  events: string[];
}

interface YearMonthSummary {
  monthDate: Date;
  monthLabel: string;
  eventCount: number;
  highlightedDays: number[];
  isCurrentMonth: boolean;
}

const WEEK_DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"] as const;
const VIEW_LABELS: Record<CalendarView, string> = {
  day: "Vista diaria",
  week: "Vista semanal",
  month: "Vista mensual",
  year: "Vista anual",
};

const DAY_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
] as const;

const SAMPLE_EVENTS: CalendarEventMap = {
  "2026-05-05": ["Clase de repaso", "Corrección de trabajos"],
  "2026-05-12": ["Actualizar capítulo 3"],
  "2026-05-18": ["Preparar examen", "Publicar recursos"],
  "2026-05-19": ["Llamado con coordinación"],
  "2026-05-20": ["Revisar parciales"],
  "2026-05-22": ["Revisión con alumnos"],
  "2026-05-27": ["Planificación de unidad nueva"],
  "2026-06-03": ["Entrega de calificaciones"],
  "2026-07-11": ["Cierre de trimestre"],
  "2026-09-02": ["Diseño de cronograma"],
  "2026-11-15": ["Subir recursos finales"],
};

const startOfDay = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const startOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const startOfYear = (date: Date): Date => new Date(date.getFullYear(), 0, 1);

const addMonths = (date: Date, amount: number): Date =>
  new Date(date.getFullYear(), date.getMonth() + amount, 1);

const addDays = (date: Date, amount: number): Date => {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
};

const addYears = (date: Date, amount: number): Date =>
  new Date(date.getFullYear() + amount, date.getMonth(), 1);

const toIsoDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getMonthGridStart = (date: Date): Date => {
  const monthStart = startOfMonth(date);
  const dayOfWeek = monthStart.getDay();
  const offset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  return addDays(monthStart, -offset);
};

const getWeekStart = (date: Date): Date => {
  const normalizedDate = startOfDay(date);
  const dayOfWeek = normalizedDate.getDay();
  const offset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  return addDays(normalizedDate, offset);
};

const buildMonthCells = (
  visibleMonth: Date,
  selectedDate: Date,
  eventsMap: CalendarEventMap,
): CalendarCell[] => {
  const today = startOfDay(new Date());
  const selected = startOfDay(selectedDate);
  const gridStart = getMonthGridStart(visibleMonth);

  return Array.from({ length: 42 }, (_, index) => {
    const date = addDays(gridStart, index);
    const isoDate = toIsoDate(date);

    return {
      isoDate,
      dayNumber: date.getDate(),
      isCurrentMonth: date.getMonth() === visibleMonth.getMonth(),
      isToday: toIsoDate(today) === isoDate,
      isSelected: toIsoDate(selected) === isoDate,
      events: eventsMap[isoDate] ?? [],
    };
  });
};

const buildWeekDays = (
  selectedDate: Date,
  eventsMap: CalendarEventMap,
): CalendarCell[] => {
  const today = startOfDay(new Date());
  const selected = startOfDay(selectedDate);
  const weekStart = getWeekStart(selectedDate);

  return Array.from({ length: 7 }, (_, index) => {
    const date = addDays(weekStart, index);
    const isoDate = toIsoDate(date);

    return {
      isoDate,
      dayNumber: date.getDate(),
      isCurrentMonth: date.getMonth() === selectedDate.getMonth(),
      isToday: toIsoDate(today) === isoDate,
      isSelected: toIsoDate(selected) === isoDate,
      events: eventsMap[isoDate] ?? [],
    };
  });
};

const buildYearSummary = (
  visibleDate: Date,
  today: Date,
  eventsMap: CalendarEventMap,
): YearMonthSummary[] =>
  Array.from({ length: 12 }, (_, monthIndex) => {
    const monthDate = new Date(visibleDate.getFullYear(), monthIndex, 1);
    const monthKey = `${monthDate.getFullYear()}-${`${monthIndex + 1}`.padStart(2, "0")}`;
    const eventEntries = Object.entries(eventsMap).filter(([isoDate]) =>
      isoDate.startsWith(monthKey),
    );

    return {
      monthDate,
      monthLabel: new Intl.DateTimeFormat("es-AR", { month: "long" }).format(
        monthDate,
      ),
      eventCount: eventEntries.reduce(
        (total, [, events]) => total + events.length,
        0,
      ),
      highlightedDays: eventEntries
        .map(([isoDate]) => Number(isoDate.split("-")[2]))
        .slice(0, 6),
      isCurrentMonth:
        monthDate.getFullYear() === today.getFullYear() &&
        monthDate.getMonth() === today.getMonth(),
    };
  });

const formatMonthTitle = (date: Date): string =>
  new Intl.DateTimeFormat("es-AR", {
    month: "long",
    year: "numeric",
  }).format(date);

const formatWeekTitle = (date: Date): string => {
  const weekStart = getWeekStart(date);
  const weekEnd = addDays(weekStart, 6);
  const rangeFormatter = new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "short",
  });

  return `${rangeFormatter.format(weekStart)} - ${rangeFormatter.format(weekEnd)} ${weekEnd.getFullYear()}`;
};

const formatDayTitle = (date: Date): string =>
  new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

const formatYearTitle = (date: Date): string => `${date.getFullYear()}`;

const formatSelectedDate = (date: Date): string =>
  new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);

const getHeaderTitle = (view: CalendarView, date: Date): string => {
  switch (view) {
    case "day":
      return formatDayTitle(date);
    case "week":
      return formatWeekTitle(date);
    case "year":
      return formatYearTitle(date);
    case "month":
    default:
      return formatMonthTitle(date);
  }
};

const getDaySlotEvents = (slot: string, events: string[]) =>
  events.filter(
    (_event, index) => DAY_SLOTS[index % DAY_SLOTS.length] === slot,
  );

export default function Calendar() {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedView, setSelectedView] = useState<CalendarView>("month");
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleReferenceDate = useMemo(() => {
    switch (selectedView) {
      case "year":
        return startOfYear(selectedDate);
      case "month":
        return startOfMonth(selectedDate);
      case "week":
      case "day":
      default:
        return startOfDay(selectedDate);
    }
  }, [selectedDate, selectedView]);

  const monthCells = useMemo(
    () => buildMonthCells(visibleReferenceDate, selectedDate, SAMPLE_EVENTS),
    [selectedDate, visibleReferenceDate],
  );

  const weekDays = useMemo(
    () => buildWeekDays(selectedDate, SAMPLE_EVENTS),
    [selectedDate],
  );

  const yearSummary = useMemo(
    () => buildYearSummary(visibleReferenceDate, today, SAMPLE_EVENTS),
    [today, visibleReferenceDate],
  );

  const selectedEvents = SAMPLE_EVENTS[toIsoDate(selectedDate)] ?? [];
  const selectedDateLabel = formatSelectedDate(selectedDate);
  const headerTitle = getHeaderTitle(selectedView, visibleReferenceDate);

  const handleGoToToday = () => {
    setSelectedDate(today);
    setMenuOpen(false);
  };

  const handleNavigate = (direction: "previous" | "next") => {
    const delta = direction === "previous" ? -1 : 1;

    setSelectedDate((currentDate) => {
      switch (selectedView) {
        case "day":
          return addDays(currentDate, delta);
        case "week":
          return addDays(currentDate, delta * 7);
        case "year":
          return addYears(currentDate, delta);
        case "month":
        default:
          return addMonths(currentDate, delta);
      }
    });

    setMenuOpen(false);
  };

  const handleSelectDate = (isoDate: string) => {
    const [year, month, day] = isoDate.split("-").map(Number);
    setSelectedDate(new Date(year, month - 1, day));
  };

  const renderMonthView = () => (
    <div className="overflow-hidden h-full rounded-2xl border border-lightBorder bg-lightPrimary shadow-sm dark:border-darkBorder dark:bg-darkPrimary">
      <div className="grid grid-cols-7 border-b border-lightBorder bg-lightDetail/40 dark:border-darkBorder dark:bg-darkAccent/15">
        {WEEK_DAYS.map((day) => (
          <div
            key={day}
            className="py-3 text-center font-sharetech text-xs uppercase tracking-[0.22em] text-lightText/75 dark:text-darkText/75"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="hidden grid-cols-7 grid-rows-6 gap-px bg-lightBorder/60 lg:grid dark:bg-darkBorder/60">
        {monthCells.map((cell) => (
          <button
            key={cell.isoDate}
            type="button"
            onClick={() => handleSelectDate(cell.isoDate)}
            className={`min-h-32 px-3 py-3 text-left transition ${
              cell.isCurrentMonth
                ? "bg-lightPrimary hover:bg-lightDetail/25 dark:bg-darkPrimary dark:hover:bg-darkAccent/20"
                : "bg-lightDetail/35 text-lightText/45 hover:bg-lightDetail/55 dark:bg-darkSecondary/35 dark:text-darkText/45 dark:hover:bg-darkSecondary/55"
            }`}
          >
            <time
              className={`flex h-8 w-8 items-center justify-center rounded-full font-sharetech text-sm ${
                cell.isSelected
                  ? "bg-lightText text-lightPrimary dark:bg-darkText dark:text-darkPrimary"
                  : cell.isToday
                    ? "bg-lightLink text-lightPrimary dark:bg-darkLink dark:text-darkPrimary"
                    : "text-lightText dark:text-darkText"
              }`}
            >
              {cell.dayNumber}
            </time>

            <ol className="mt-3 space-y-1.5">
              {cell.events.slice(0, 2).map((event) => (
                <li
                  key={`${cell.isoDate}-${event}`}
                  className="truncate rounded-md bg-lightAccent/20 px-2 py-1 font-sharetech text-xs text-lightText dark:bg-darkAccent/20 dark:text-darkText"
                >
                  {event}
                </li>
              ))}

              {cell.events.length > 2 && (
                <li className="font-sharetech text-xs text-lightLink dark:text-darkLink">
                  +{cell.events.length - 2} más
                </li>
              )}
            </ol>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-lightBorder/60 lg:hidden dark:bg-darkBorder/60">
        {monthCells.map((cell) => (
          <button
            key={cell.isoDate}
            type="button"
            onClick={() => handleSelectDate(cell.isoDate)}
            className={`flex h-16 flex-col px-2 py-2 transition ${
              cell.isCurrentMonth
                ? "bg-lightPrimary hover:bg-lightDetail/25 dark:bg-darkPrimary dark:hover:bg-darkAccent/20"
                : "bg-lightDetail/35 text-lightText/45 hover:bg-lightDetail/55 dark:bg-darkSecondary/35 dark:text-darkText/45 dark:hover:bg-darkSecondary/55"
            }`}
          >
            <time
              className={`ml-auto flex h-7 w-7 items-center justify-center rounded-full font-sharetech text-xs ${
                cell.isSelected
                  ? "bg-lightText text-lightPrimary dark:bg-darkText dark:text-darkPrimary"
                  : cell.isToday
                    ? "bg-lightLink text-lightPrimary dark:bg-darkLink dark:text-darkPrimary"
                    : "text-lightText dark:text-darkText"
              }`}
            >
              {cell.dayNumber}
            </time>

            <span className="mt-auto flex flex-wrap justify-start gap-1">
              {cell.events.slice(0, 3).map((event) => (
                <span
                  key={`${cell.isoDate}-${event}`}
                  className="h-1.5 w-1.5 rounded-full bg-lightLink dark:bg-darkLink"
                />
              ))}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderWeekView = () => (
    <div className="overflow-y-clip h-full rounded-2xl border border-lightBorder bg-lightPrimary shadow-sm dark:border-darkBorder dark:bg-darkPrimary">
      <div className="grid grid-cols-7 gap-px border-b border-lightBorder bg-lightDetail/40 px-4 py-4 dark:border-darkBorder dark:bg-darkAccent/15">
        {weekDays.map((day) => (
          <button
            key={day.isoDate}
            type="button"
            onClick={() => handleSelectDate(day.isoDate)}
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
        {weekDays.map((day) => (
          <div
            key={day.isoDate}
            className={`rounded-2xl border p-3 ${
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
                  <li
                    key={`${day.isoDate}-${event}`}
                    className="rounded-lg bg-lightPrimary px-3 py-2 font-sharetech text-sm text-lightText dark:bg-darkPrimary dark:text-darkText"
                  >
                    {event}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 font-sharetech text-sm text-lightText/60 dark:text-darkText/60">
                Sin eventos.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderDayView = () => {
    return (
      <div className="overflow-hidden rounded-2xl border border-lightBorder bg-lightPrimary shadow-sm dark:border-darkBorder dark:bg-darkPrimary">
        <div className="border-b border-lightBorder px-5 py-4 dark:border-darkBorder">
          <p className="font-sharetech text-xs uppercase tracking-[0.18em] text-lightText/70 dark:text-darkText/70">
            Jornada seleccionada
          </p>
          <h4 className="mt-1 font-pixelify text-2xl text-lightText dark:text-darkText">
            {formatDayTitle(selectedDate)}
          </h4>
        </div>

        <div className="divide-y divide-lightBorder dark:divide-darkBorder">
          {DAY_SLOTS.map((slot) => {
            const slotEvents = getDaySlotEvents(slot, selectedEvents);

            return (
              <div
                key={slot}
                className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 px-4 py-4"
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
                          key={`${slot}-${event}`}
                          className="rounded-xl border border-lightBorder bg-lightSecondary/25 px-3 py-3 dark:border-darkBorder dark:bg-darkSecondary/25"
                        >
                          <p className="font-sharetech text-sm text-lightText dark:text-darkText">
                            {event}
                          </p>
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
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderYearView = () => (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {yearSummary.map((month) => (
        <button
          key={month.monthDate.toISOString()}
          type="button"
          onClick={() => {
            setSelectedDate(month.monthDate);
            setSelectedView("month");
          }}
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

  const renderMainView = () => {
    switch (selectedView) {
      case "day":
        return renderDayView();
      case "week":
        return renderWeekView();
      case "year":
        return renderYearView();
      case "month":
      default:
        return renderMonthView();
    }
  };

  return (
    <section className="mt-8 flex w-full max-w-6xl flex-col gap-4 rounded-2xl border border-lightBorder bg-lightSecondary/55 shadow-md dark:border-darkBorder dark:bg-darkSecondary/55">
      <header className="flex flex-col gap-4 border-b border-lightBorder px-5 py-5 dark:border-darkBorder lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-sharetech text-xs uppercase tracking-[0.25em] text-lightLink dark:text-darkLink">
            Agenda docente
          </p>
          <h3 className="mt-2 font-pixelify text-3xl capitalize text-lightText dark:text-darkText">
            {headerTitle}
          </h3>
          <p className="mt-1 font-sharetech text-sm text-lightText/75 dark:text-darkText/75">
            {selectedDateLabel}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center rounded-xl border border-lightBorder bg-lightPrimary dark:border-darkBorder dark:bg-darkPrimary">
            <button
              type="button"
              onClick={() => handleNavigate("previous")}
              className="flex h-11 w-11 items-center justify-center rounded-l-xl text-lightText transition hover:bg-lightAccent/35 dark:text-darkText dark:hover:bg-darkAccent/35"
              aria-label="Anterior"
            >
              <FiChevronLeft />
            </button>

            <button
              type="button"
              onClick={handleGoToToday}
              className="border-x border-lightBorder px-4 py-2 font-pixelify text-sm text-lightText transition hover:bg-lightAccent/25 dark:border-darkBorder dark:text-darkText dark:hover:bg-darkAccent/25"
            >
              Hoy
            </button>

            <button
              type="button"
              onClick={() => handleNavigate("next")}
              className="flex h-11 w-11 items-center justify-center rounded-r-xl text-lightText transition hover:bg-lightAccent/35 dark:text-darkText dark:hover:bg-darkAccent/35"
              aria-label="Siguiente"
            >
              <FiChevronRight />
            </button>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((currentValue) => !currentValue)}
              className="flex min-w-44 items-center justify-between rounded-xl border border-lightBorder bg-lightPrimary px-4 py-3 font-sharetech text-sm text-lightText shadow-sm transition hover:bg-lightAccent/25 dark:border-darkBorder dark:bg-darkPrimary dark:text-darkText dark:hover:bg-darkAccent/25"
            >
              <span>{VIEW_LABELS[selectedView]}</span>
              <span className={`transition ${menuOpen ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-14 z-20 w-full rounded-xl border border-lightBorder bg-lightPrimary p-2 shadow-lg dark:border-darkBorder dark:bg-darkPrimary">
                {(Object.entries(VIEW_LABELS) as [CalendarView, string][]).map(
                  ([viewKey, label]) => (
                    <button
                      key={viewKey}
                      type="button"
                      onClick={() => {
                        setSelectedView(viewKey);
                        setMenuOpen(false);
                      }}
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
      </header>

      <div
        className={`grid gap-4 p-4  h-full  ${
          selectedView === "year" ? "" : "xl:flex flex-col items-start justify-center"
        }`}
      >
        {selectedView !== "year" && (
          <aside className="rounded-2xl border border-lightBorder bg-lightPrimary p-4 shadow-sm dark:border-darkBorder dark:bg-darkPrimary">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-lightLink/15 p-3 text-lightLink dark:bg-darkLink/15 dark:text-darkLink">
                <FiCalendar className="text-xl" />
              </div>
              <div>
                <h4 className="font-pixelify text-xl text-lightText dark:text-darkText">
                  Eventos del día
                </h4>
                <p className="font-sharetech text-xs uppercase tracking-[0.2em] text-lightText/70 dark:text-darkText/70">
                  {selectedDateLabel}
                </p>
              </div>
            </div>

            <div className="mt-5">
              {selectedEvents.length > 0 ? (
                <ul className="space-y-3">
                  {selectedEvents.map((event) => (
                    <li
                      key={`${toIsoDate(selectedDate)}-${event}`}
                      className="rounded-xl border border-lightBorder bg-lightSecondary/35 px-3 py-3 dark:border-darkBorder dark:bg-darkSecondary/35"
                    >
                      <p className="font-sharetech text-sm text-lightText dark:text-darkText">
                        {event}
                      </p>
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
        )}
        <div>{renderMainView()}</div>
      </div>
    </section>
  );
}
