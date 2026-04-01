import type { Chapter } from "../../BR/domain/entities/chapter.interface";

export interface chapterReader{
    chapter: Chapter,
    setSidebarOpen: (open: boolean) => void,
}
