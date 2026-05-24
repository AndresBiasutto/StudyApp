import type {
  CalendarEntry,
  CalendarEntryPayload,
} from "../../../domain/entities/calendar.interface";
import type { CalendarRepository } from "../../../domain/services/calendar.repository";

export class CreateCalendarEntryUseCase {
  private repository: CalendarRepository;

  constructor(repository: CalendarRepository) {
    this.repository = repository;
  }

  execute(entry: CalendarEntryPayload): Promise<CalendarEntry> {
    return this.repository.create(entry);
  }
}
