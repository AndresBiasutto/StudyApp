import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  CalendarEntryPayload,
} from "../../../BR/domain/entities/calendar.interface";
import { getCalendarUseCases } from "../../../BR/application/useCases/Calendar";
import type { UpdateCalendarThunkPayload } from "./calendar.type";

export const fetchCalendarEntries = createAsyncThunk(
  "calendar/fetchAll",
  async () => {
    return await getCalendarUseCases().getCalendarEntries.execute();
  },
);

export const fetchCalendarEntryById = createAsyncThunk(
  "calendar/fetchById",
  async (id: string) => {
    return await getCalendarUseCases().getCalendarEntryById.execute(id);
  },
);

export const createCalendarEntry = createAsyncThunk(
  "calendar/create",
  async (entry: CalendarEntryPayload) => {
    return await getCalendarUseCases().createCalendarEntry.execute(entry);
  },
);

export const updateCalendarEntry = createAsyncThunk(
  "calendar/update",
  async ({ id, data }: UpdateCalendarThunkPayload) => {
    return await getCalendarUseCases().updateCalendarEntry.execute(id, data);
  },
);

export const deleteCalendarEntry = createAsyncThunk(
  "calendar/delete",
  async (id: string) => {
    await getCalendarUseCases().deleteCalendarEntry.execute(id);
    return id;
  },
);
