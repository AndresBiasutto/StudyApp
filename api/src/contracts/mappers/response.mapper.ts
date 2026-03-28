import { Model } from "sequelize";
import {
  BasicUserResponseDto,
  GradeResponseDto,
  RoleResponseDto,
} from "../common.contract";
import {
  ChapterResponseDto,
  SubjectResponseDto,
  SubjectSummaryResponseDto,
  UnitResponseDto,
} from "../subject.contract";
import {
  AuthResponseDto,
  UserListResponseDto,
  UserResponseDto,
} from "../user.contract";

const toPlain = <T>(value: T): any => {
  if (value && typeof value === "object" && "get" in (value as object)) {
    return (value as unknown as Model).get({ plain: true });
  }

  return value;
};

export const mapRoleResponse = (role: unknown): RoleResponseDto | null => {
  const data = toPlain(role);

  if (!data) {
    return null;
  }

  return {
    id_role: String(data.id_role),
    name: data.name,
  };
};

export const mapGradeResponse = (grade: unknown): GradeResponseDto | null => {
  const data = toPlain(grade);

  if (!data) {
    return null;
  }

  return {
    id_grade: String(data.id_grade),
    name: data.name,
  };
};

export const mapBasicUserResponse = (
  user: unknown,
): BasicUserResponseDto | null => {
  const data = toPlain(user);

  if (!data) {
    return null;
  }

  return {
    id_user: String(data.id_user),
    name: data.name,
    last_name: data.last_name,
    e_mail: data.e_mail ?? null,
    image: data.image ?? null,
    Role: mapRoleResponse(data.Role),
  };
};

export const mapSubjectSummaryResponse = (
  subject: unknown,
): SubjectSummaryResponseDto => {
  const data = toPlain(subject);

  return {
    id_subject: String(data.id_subject),
    name: data.name,
    description: data.description ?? null,
    imageUrl: data.imageUrl ?? null,
    Grade: mapGradeResponse(data.Grade),
  };
};

export const mapChapterResponse = (chapter: unknown): ChapterResponseDto => {
  const data = toPlain(chapter);

  return {
    id_chapter: String(data.id_chapter),
    name: data.name,
    description: data.description ?? null,
    order: data.order ?? null,
  };
};

export const mapUnitResponse = (unit: unknown): UnitResponseDto => {
  const data = toPlain(unit);

  return {
    id_unit: String(data.id_unit),
    name: data.name,
    description: data.description ?? null,
    order: data.order ?? null,
    imageUrl: data.imageUrl ?? null,
    createdChapters: Array.isArray(data.createdChapters)
      ? data.createdChapters.map(mapChapterResponse)
      : [],
  };
};

export const mapSubjectResponse = (subject: unknown): SubjectResponseDto => {
  const data = toPlain(subject);

  return {
    id_subject: String(data.id_subject),
    name: data.name,
    description: data.description ?? null,
    imageUrl: data.imageUrl ?? null,
    Grade: mapGradeResponse(data.Grade),
    creator: mapBasicUserResponse(data.creator),
    students: Array.isArray(data.students)
      ? data.students
          .map(mapBasicUserResponse)
          .filter(Boolean) as BasicUserResponseDto[]
      : [],
    createdUnits: Array.isArray(data.createdUnits)
      ? data.createdUnits.map(mapUnitResponse)
      : [],
  };
};

export const mapUserListResponse = (user: unknown): UserListResponseDto => {
  const data = toPlain(user);
  const baseUser = mapBasicUserResponse(data);

  if (!baseUser) {
    throw new Error("User data is required");
  }

  return {
    ...baseUser,
    contact_number: data.contact_number ?? null,
  };
};

export const mapUserResponse = (user: unknown): UserResponseDto => {
  const data = toPlain(user);
  const listUser = mapUserListResponse(data);

  return {
    ...listUser,
    description: data.description ?? null,
    id_role: data.id_role ?? null,
    subjects: Array.isArray(data.createdSubjects)
      ? data.createdSubjects.map(mapSubjectSummaryResponse)
      : Array.isArray(data.subjects)
        ? data.subjects.map(mapSubjectSummaryResponse)
        : [],
    enrolledSubjects: Array.isArray(data.enrolledSubjects)
      ? data.enrolledSubjects.map(mapSubjectSummaryResponse)
      : [],
  };
};

export const mapAuthResponse = (
  user: unknown,
  token: string,
): AuthResponseDto => ({
  ...mapUserResponse(user),
  token,
});
