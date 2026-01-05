import type { Chapter } from "./chapter";

export interface chapterReader{
    chapter: Chapter,
    setSidebarOpen: (open: boolean) => void,
}