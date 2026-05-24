import type { CalendarRepository } from "../../../domain/services/calendar.repository";

export class DeleteCalendarEntryUseCase {
  private repository: CalendarRepository;

  constructor(repository: CalendarRepository) {
    this.repository = repository;
  }

  execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
