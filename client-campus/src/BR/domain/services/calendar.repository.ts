import type {
  CalendarEntry,
  CalendarEntryPayload,
} from "../entities/calendar.interface";

export interface CalendarRepository {
  getAll(): Promise<CalendarEntry[]>;
  getById(id: string): Promise<CalendarEntry>;
  create(entry: CalendarEntryPayload): Promise<CalendarEntry>;
  update(id: string, entry: Partial<CalendarEntryPayload>): Promise<CalendarEntry>;
  delete(id: string): Promise<void>;
}
