import type {
  CalendarEntry,
  CalendarEntryPayload,
} from "../../../domain/entities/calendar.interface";
import type { CalendarRepository } from "../../../domain/services/calendar.repository";

export class UpdateCalendarEntryUseCase {
  private repository: CalendarRepository;

  constructor(repository: CalendarRepository) {
    this.repository = repository;
  }

  execute(
    id: string,
    entry: Partial<CalendarEntryPayload>,
  ): Promise<CalendarEntry> {
    return this.repository.update(id, entry);
  }
}
