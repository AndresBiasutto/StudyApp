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

interface CalendarSubject {
  id_subject: string;
  students?: Array<{ id_user: string }>;
}

interface CalendarUser {
  id_user: string;
  Role?: { name?: string | null } | null;
  subjects?: CalendarSubject[];
  enrolledSubjects?: Array<{ id_subject: string }>;
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

  private async getCurrentUser(id_user: string) {
    const user = (await userService.getUser(id_user)) as CalendarUser | null;

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  private isAdmin(user: CalendarUser): boolean {
    return user.Role?.name === "admin";
  }

  private isTeacher(user: CalendarUser): boolean {
    return user.Role?.name === "teacher";
  }

  private isStudent(user: CalendarUser): boolean {
    return user.Role?.name === "student";
  }

  private isOwnedByCurrentUser(entry: { emisor?: string }, currentUserId: string) {
    return entry.emisor === currentUserId;
  }

  private isAdminPublished(entry: { role?: string | null }) {
    return entry.role === "admin";
  }

  private isVisibleToStudent(
    entry: { emisor?: string; role?: string | null },
    currentUser: CalendarUser,
    creator: CalendarUser | null,
  ) {
    if (!this.isStudent(currentUser) || !creator) {
      return false;
    }

    const creatorSubjectIds = new Set(
      (creator.subjects ?? []).map((subject) => subject.id_subject),
    );
    const studentSubjectIds = new Set(
      (currentUser.enrolledSubjects ?? []).map((subject) => subject.id_subject),
    );

    for (const subject of creator.subjects ?? []) {
      if (!studentSubjectIds.has(subject.id_subject)) {
        continue;
      }

      if (subject.students?.some((student) => student.id_user === currentUser.id_user)) {
        return true;
      }
    }

    return creatorSubjectIds.size > 0 && false;
  }

  private async canViewEntry(
    entry: { emisor?: string; role?: string | null },
    currentUser: CalendarUser,
    creator: CalendarUser | null,
  ) {
    if (this.isAdmin(currentUser)) {
      return true;
    }

    if (this.isOwnedByCurrentUser(entry, currentUser.id_user)) {
      return true;
    }

    if (this.isAdminPublished(entry)) {
      return true;
    }

    if (entry.role === "teacher") {
      return this.isVisibleToStudent(entry, currentUser, creator);
    }

    return false;
  }

  private async getCreatorForEntry(emisor?: string) {
    if (!emisor) {
      return null;
    }

    try {
      return (await userService.getUser(emisor)) as CalendarUser;
    } catch {
      return null;
    }
  }

  async createCalendarEntry(id_user: string, data: CalendarInput) {
    const accessProfile = await userService.getUserAccessProfile(id_user);

    if (accessProfile.role !== "teacher" && accessProfile.role !== "admin") {
      throw new ForbiddenError("No tienes permisos para crear eventos");
    }

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
    const currentUser = await this.getCurrentUser(id_user);
    const calendarEntry = await calendarRepository.getCalendarEntryById(id);

    if (!calendarEntry) {
      throw new NotFoundError("Calendar entry not found");
    }

    const plainEntry = calendarEntry.get({
      plain: true,
    }) as { emisor?: string; role?: string | null };

    const creator = await this.getCreatorForEntry(plainEntry.emisor);

    if (!(await this.canViewEntry(plainEntry, currentUser, creator))) {
      throw new ForbiddenError("No tienes permisos para ver este evento");
    }

    return mapCalendarResponse(calendarEntry);
  }

  async getCalendarEntries(id_user: string) {
    const currentUser = await this.getCurrentUser(id_user);
    const calendarEntries = await calendarRepository.getAllCalendarEntries();
    const visibleEntries = [];

    for (const calendarEntry of calendarEntries) {
      const plainEntry = calendarEntry.get({
        plain: true,
      }) as { emisor?: string; role?: string | null };

      const creator = await this.getCreatorForEntry(plainEntry.emisor);

      if (await this.canViewEntry(plainEntry, currentUser, creator)) {
        visibleEntries.push(calendarEntry);
      }
    }

    return visibleEntries.map(mapCalendarResponse);
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
