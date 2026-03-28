export interface RoleResponseDto {
  id_role: string;
  name: string;
}

export interface GradeResponseDto {
  id_grade: string;
  name: string;
}

export interface BasicUserResponseDto {
  id_user: string;
  name: string;
  last_name: string;
  e_mail?: string | null;
  image?: string | null;
  Role?: RoleResponseDto | null;
}
