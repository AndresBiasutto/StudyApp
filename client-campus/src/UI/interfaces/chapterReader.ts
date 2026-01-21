import type { Chapter } from "../UI/types/chapter";

export interface chapterReader{
    chapter: Chapter,
    setSidebarOpen: (open: boolean) => void,
}