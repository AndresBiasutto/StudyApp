export interface CalendarResponseDto {
  id: string;
  title: string;
  text: string;
  date: string;
  emisor: string;
  receptor: string[];
  role?: string | null;
  hour?: string | null;
}
