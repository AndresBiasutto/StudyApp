export interface StoredCalendarEvent {
  title: string;
  description: string;
}

export interface CalendarModalData {
  selectedDate: string;
}

const CALENDAR_STORAGE_KEY = "calendar-events";
export const CALENDAR_EVENTS_UPDATED = "calendar-events-updated";

const isBrowser = (): boolean => typeof window !== "undefined";

const readStorage = (): Record<string, StoredCalendarEvent[]> => {
  if (!isBrowser()) {
    return {};
  }

  const rawValue = window.localStorage.getItem(CALENDAR_STORAGE_KEY);

  if (!rawValue) {
    return {};
  }

  try {
    const parsed = JSON.parse(rawValue) as unknown;

    if (!parsed || typeof parsed !== "object") {
      return {};
    }

    return parsed as Record<string, StoredCalendarEvent[]>;
  } catch {
    return {};
  }
};

const writeStorage = (data: Record<string, StoredCalendarEvent[]>): void => {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent(CALENDAR_EVENTS_UPDATED));
};

export const getCalendarEventStore = (): Record<string, StoredCalendarEvent[]> =>
  readStorage();

export const getCalendarEventTitles = (): Record<string, string[]> => {
  const store = readStorage();

  return Object.fromEntries(
    Object.entries(store).map(([date, events]) => [
      date,
      events.map((event) => event.title),
    ]),
  );
};

export const saveCalendarEvent = (
  date: string,
  event: StoredCalendarEvent,
): void => {
  const store = readStorage();
  const existingEvents = store[date] ?? [];

  writeStorage({
    ...store,
    [date]: [...existingEvents, event],
  });
};
