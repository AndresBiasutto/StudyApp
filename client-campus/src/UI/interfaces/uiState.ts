import type { Chapter } from "../../BR/domain/entities/chapter.interface";
import type { ExamQuestion } from "../../BR/domain/entities/exam.interface";
import type { Subject } from "../../BR/domain/entities/subject.interface";
import type { Unit } from "../../BR/domain/entities/unit.interface";
import type { User } from "../../BR/domain/entities/user.interface";

type ModalEntity =
  | Subject
  | Unit
  | Chapter
  | User
  | { id_chapter: string; questions?: ExamQuestion[] };

export interface UiState {
  sidebarOpen: boolean;
  modalOpen: boolean;
  isDark: boolean;
  settingsMenuOpen: boolean;
  modalContent: {
    type: string;
    data: ModalEntity | null;
    title: string;
  };
}
