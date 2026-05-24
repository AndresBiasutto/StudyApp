import type { CalendarEntry } from "../../../domain/entities/calendar.interface";
import type { CalendarRepository } from "../../../domain/services/calendar.repository";

export class GetCalendarEntriesUseCase {
  private repository: CalendarRepository;

  constructor(repository: CalendarRepository) {
    this.repository = repository;
  }

  execute(): Promise<CalendarEntry[]> {
    return this.repository.getAll();
  }
}
