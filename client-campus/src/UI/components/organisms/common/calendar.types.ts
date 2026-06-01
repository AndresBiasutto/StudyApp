import type { CalendarEntry } from "../../../../BR/domain/entities/calendar.interface";
export type CalendarView = "day" | "week" | "month" | "year";

export interface CalendarCell {
  isoDate: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  events: CalendarEntry[];
}

export interface YearMonthSummary {
  monthDate: Date;
  monthLabel: string;
  eventCount: number;
  highlightedDays: number[];
  isCurrentMonth: boolean;
}

export interface CalendarEventMap {
  [isoDate: string]: CalendarEntry[];
}
