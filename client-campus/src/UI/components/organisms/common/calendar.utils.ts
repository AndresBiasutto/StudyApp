import type { CalendarEntry } from "../../../../BR/domain/entities/calendar.interface";
import type {
  CalendarCell,
  CalendarEventMap,
  CalendarView,
  YearMonthSummary,
} from "./calendar.types";

export const WEEK_DAYS = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"] as const;

export const VIEW_LABELS: Record<CalendarView, string> = {
  day: "Vista diaria",
  week: "Vista semanal",
  month: "Vista mensual",
  year: "Vista anual",
};

export const DAY_SLOTS = [
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

export const startOfDay = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const startOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), 1);

export const startOfYear = (date: Date): Date => new Date(date.getFullYear(), 0, 1);

export const addMonths = (date: Date, amount: number): Date =>
  new Date(date.getFullYear(), date.getMonth() + amount, 1);

export const addDays = (date: Date, amount: number): Date => {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
};

export const addYears = (date: Date, amount: number): Date =>
  new Date(date.getFullYear() + amount, date.getMonth(), 1);

export const toIsoDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const sortEntries = (entries: CalendarEntry[]): CalendarEntry[] =>
  [...entries].sort((entryA, entryB) => {
    const hourA = entryA.hour ?? "99:99";
    const hourB = entryB.hour ?? "99:99";

    if (hourA !== hourB) {
      return hourA.localeCompare(hourB);
    }

    return entryA.title.localeCompare(entryB.title);
  });

export const buildEventMap = (entries: CalendarEntry[]): CalendarEventMap => {
  const groupedMap: CalendarEventMap = {};

  entries.forEach((entry) => {
    if (!groupedMap[entry.date]) {
      groupedMap[entry.date] = [];
    }

    groupedMap[entry.date].push(entry);
  });

  Object.keys(groupedMap).forEach((dateKey) => {
    groupedMap[dateKey] = sortEntries(groupedMap[dateKey]);
  });

  return groupedMap;
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

export const buildMonthCells = (
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

export const buildWeekDays = (
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

export const buildYearSummary = (
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
        (total, [, entries]) => total + entries.length,
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

export const formatMonthTitle = (date: Date): string =>
  new Intl.DateTimeFormat("es-AR", {
    month: "long",
    year: "numeric",
  }).format(date);

export const formatWeekTitle = (date: Date): string => {
  const weekStart = getWeekStart(date);
  const weekEnd = addDays(weekStart, 6);
  const rangeFormatter = new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "short",
  });

  return `${rangeFormatter.format(weekStart)} - ${rangeFormatter.format(weekEnd)} ${weekEnd.getFullYear()}`;
};

export const formatDayTitle = (date: Date): string =>
  new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

export const formatYearTitle = (date: Date): string => `${date.getFullYear()}`;

export const formatSelectedDate = (date: Date): string =>
  new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);

export const formatEventPreview = (entry: CalendarEntry): string =>
  entry.hour ? `${entry.hour} ${entry.title}` : entry.title;

export const getHeaderTitle = (view: CalendarView, date: Date): string => {
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
