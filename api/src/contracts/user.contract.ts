import { BasicUserResponseDto } from "./common.contract";
import { SubjectSummaryResponseDto } from "./subject.contract";

export interface UserListResponseDto extends BasicUserResponseDto {
  contact_number?: string | null;
}

export interface UserResponseDto extends UserListResponseDto {
  description?: string | null;
  id_role?: string | null;
  subjects: SubjectSummaryResponseDto[];
  enrolledSubjects: SubjectSummaryResponseDto[];
}

export interface AuthResponseDto extends UserResponseDto {
  token: string;
}
