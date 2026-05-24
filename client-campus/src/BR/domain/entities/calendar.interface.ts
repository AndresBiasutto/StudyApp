export interface CalendarEntry {
  id: string;
  title: string;
  text: string;
  date: string;
  emisor: string;
  receptor: string[];
  role?: string | null;
  hour?: string | null;
}

export interface CalendarEntryPayload {
  title: string;
  text: string;
  date: string;
  receptor?: string[];
  role?: string | null;
  hour?: string | null;
}
