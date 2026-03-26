import { createSlice } from "@reduxjs/toolkit";
import type { ChapterState } from "./chapter.types";
import {
  createChapter,
  deleteChapter,
  fetchChapterById,
  fetchChapters,
  updateChapter,
} from "./chapter.thunk";

const initialState: ChapterState = {
  items: [],
  selected: undefined,
  loading: false,
  error: null,
};

const chapterSlice = createSlice({
  name: "chapters",
  initialState,
  reducers: {
    clearSelectedChapter: (state) => {
      state.selected = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChapters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChapters.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchChapters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al obtener capitulos";
      })
      .addCase(fetchChapterById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(createChapter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al crear el capitulo";
      })
      .addCase(updateChapter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateChapter.fulfilled, (state, action) => {
        state.loading = false;
        const itemId = action.payload.id_chapter;
        const index = state.items.findIndex(
          (chapter) => chapter.id_chapter === itemId
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selected?.id_chapter === itemId) {
          state.selected = action.payload;
        }
      })
      .addCase(updateChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al actualizar el capitulo";
      })
      .addCase(deleteChapter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (chapter) => chapter.id_chapter !== action.payload
        );
      })
      .addCase(deleteChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al eliminar el capitulo";
      });
  },
});

export const { clearSelectedChapter } = chapterSlice.actions;
export default chapterSlice.reducer;
