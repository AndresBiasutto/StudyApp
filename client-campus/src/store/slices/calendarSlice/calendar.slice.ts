import { createSlice } from "@reduxjs/toolkit";
import type { CalendarState } from "./calendar.type";
import {
  createCalendarEntry,
  deleteCalendarEntry,
  fetchCalendarEntries,
  fetchCalendarEntryById,
  updateCalendarEntry,
} from "./calendar.thunk";

const initialState: CalendarState = {
  items: [],
  selected: null,
  loadingList: false,
  creating: false,
  updating: false,
  deleting: false,
  error: null,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    clearSelectedCalendarEntry: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalendarEntries.pending, (state) => {
        state.loadingList = true;
        state.error = null;
      })
      .addCase(fetchCalendarEntries.fulfilled, (state, action) => {
        state.loadingList = false;
        state.items = action.payload;
      })
      .addCase(fetchCalendarEntries.rejected, (state, action) => {
        state.loadingList = false;
        state.error = action.error.message ?? "Error al obtener el calendario";
      })
      .addCase(fetchCalendarEntryById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(createCalendarEntry.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createCalendarEntry.fulfilled, (state, action) => {
        state.creating = false;
        state.items.push(action.payload);
      })
      .addCase(createCalendarEntry.rejected, (state, action) => {
        state.creating = false;
        state.error = action.error.message ?? "Error al crear el evento";
      })
      .addCase(updateCalendarEntry.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateCalendarEntry.fulfilled, (state, action) => {
        state.updating = false;
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        );

        if (state.selected?.id === action.payload.id) {
          state.selected = action.payload;
        }
      })
      .addCase(updateCalendarEntry.rejected, (state, action) => {
        state.updating = false;
        state.error = action.error.message ?? "Error al actualizar el evento";
      })
      .addCase(deleteCalendarEntry.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteCalendarEntry.fulfilled, (state, action) => {
        state.deleting = false;
        state.items = state.items.filter((item) => item.id !== action.payload);

        if (state.selected?.id === action.payload) {
          state.selected = null;
        }
      })
      .addCase(deleteCalendarEntry.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.error.message ?? "Error al eliminar el evento";
      });
  },
});

export const { clearSelectedCalendarEntry } = calendarSlice.actions;
export default calendarSlice.reducer;
