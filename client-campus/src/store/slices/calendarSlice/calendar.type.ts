import type {
  CalendarEntry,
  CalendarEntryPayload,
} from "../../../BR/domain/entities/calendar.interface";

export interface CalendarState {
  items: CalendarEntry[];
  selected: CalendarEntry | null;
  loadingList: boolean;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  error: string | null;
}

export interface CalendarModalData {
  selectedDate: string;
  selectedHour?: string;
  item?: CalendarEntry | null;
}

export interface UpdateCalendarThunkPayload {
  id: string;
  data: Partial<CalendarEntryPayload>;
}
