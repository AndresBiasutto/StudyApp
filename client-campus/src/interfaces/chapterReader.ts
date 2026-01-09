import type { Chapter } from "../types/chapter";

export interface chapterReader{
    chapter: Chapter,
    setSidebarOpen: (open: boolean) => void,
}