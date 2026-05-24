import type {
  CalendarEntry,
  CalendarEntryPayload,
} from "../../domain/entities/calendar.interface";
import type { CalendarRepository } from "../../domain/services/calendar.repository";
import { httpClient } from "../services/httpClient";

export class CalendarApiRepository implements CalendarRepository {
  async getAll(): Promise<CalendarEntry[]> {
    const { data } = await httpClient.get<CalendarEntry[]>("/calendar");
    return data;
  }

  async getById(id: string): Promise<CalendarEntry> {
    const { data } = await httpClient.get<CalendarEntry>(`/calendar/${id}`);
    return data;
  }

  async create(entry: CalendarEntryPayload): Promise<CalendarEntry> {
    const { data } = await httpClient.post<CalendarEntry>("/calendar", entry);
    return data;
  }

  async update(
    id: string,
    entry: Partial<CalendarEntryPayload>,
  ): Promise<CalendarEntry> {
    const { data } = await httpClient.put<CalendarEntry>(
      `/calendar/${id}`,
      entry,
    );
    return data;
  }

  async delete(id: string): Promise<void> {
    await httpClient.delete(`/calendar/${id}`);
  }
}
