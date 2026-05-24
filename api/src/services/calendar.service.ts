import { mapCalendarResponse } from "../contracts/mappers/response.mapper";
import calendarRepository from "../repositories/calendar.repository";
import userService from "./user.service";
import { ForbiddenError, NotFoundError } from "../utils/errors";

interface CalendarInput {
  title: string;
  text: string;
  date: string;
  receptor?: string[];
  role?: string | null;
  hour?: string | null;
}

class CalendarService {
  private async ensureEntryOwner(id: string, currentUserId: string) {
    const calendarEntry = await calendarRepository.getCalendarEntryById(id);

    if (!calendarEntry) {
      throw new NotFoundError("Calendar entry not found");
    }

    const plainEntry = calendarEntry.get({
      plain: true,
    }) as {
      emisor?: string;
    };

    if (plainEntry.emisor !== currentUserId) {
      throw new ForbiddenError(
        "No tienes permisos para modificar este evento del calendario",
      );
    }

    return calendarEntry;
  }

  async createCalendarEntry(id_user: string, data: CalendarInput) {
    const accessProfile = await userService.getUserAccessProfile(id_user);

    const createdEntry = await calendarRepository.createCalendarEntry({
      ...data,
      emisor: id_user,
      receptor: data.receptor ?? [],
      role: data.role ?? accessProfile.role,
      hour: data.hour ?? null,
    });

    return mapCalendarResponse(createdEntry);
  }

  async getCalendarEntry(id: string, id_user: string) {
    const calendarEntry = await this.ensureEntryOwner(id, id_user);
    return mapCalendarResponse(calendarEntry);
  }

  async getCalendarEntries(id_user: string) {
    const calendarEntries =
      await calendarRepository.getCalendarEntriesByUserId(id_user);

    return calendarEntries.map(mapCalendarResponse);
  }

  async updateCalendarEntry(
    id: string,
    id_user: string,
    data: Partial<CalendarInput>,
  ) {
    await this.ensureEntryOwner(id, id_user);

    const updatedEntry = await calendarRepository.updateCalendarEntry(id, data);

    if (!updatedEntry) {
      throw new NotFoundError("Calendar entry not found");
    }

    return mapCalendarResponse(updatedEntry);
  }

  async deleteCalendarEntry(id: string, id_user: string) {
    await this.ensureEntryOwner(id, id_user);

    const deletedEntry = await calendarRepository.deleteCalendarEntry(id);

    if (!deletedEntry) {
      throw new NotFoundError("Calendar entry not found");
    }

    return true;
  }
}

export default new CalendarService();
