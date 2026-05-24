import type { CalendarEntry } from "../../../domain/entities/calendar.interface";
import type { CalendarRepository } from "../../../domain/services/calendar.repository";

export class GetCalendarEntryByIdUseCase {
  private repository: CalendarRepository;

  constructor(repository: CalendarRepository) {
    this.repository = repository;
  }

  execute(id: string): Promise<CalendarEntry> {
    return this.repository.getById(id);
  }
}
