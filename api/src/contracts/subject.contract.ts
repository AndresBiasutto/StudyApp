import { BasicUserResponseDto, GradeResponseDto } from "./common.contract";

export interface ChapterResponseDto {
  id_chapter: string;
  name: string;
  description?: string | null;
  order?: number | null;
}

export interface UnitResponseDto {
  id_unit: string;
  name: string;
  description?: string | null;
  order?: number | null;
  imageUrl?: string | null;
  createdChapters: ChapterResponseDto[];
}

export interface SubjectResponseDto {
  id_subject: string;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  Grade?: GradeResponseDto | null;
  creator?: BasicUserResponseDto | null;
  students: BasicUserResponseDto[];
  createdUnits: UnitResponseDto[];
}

export interface SubjectSummaryResponseDto {
  id_subject: string;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  Grade?: GradeResponseDto | null;
}
