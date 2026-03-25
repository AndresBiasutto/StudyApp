import { UserApiRepository } from '../repositories/userApiRepository';
import { SubjectApiRepository } from '../repositories/subjectApiRepository';
import { RoleApiRepository } from '../repositories/roleApi.repository';
import { GradeRepository } from '../repositories/grade.repository';
import type { UserRepository } from '../../domain/services/user.repository';
import type { SubjectRepository } from '../../domain/services/subjectRepository';
import type { RoleRepository } from '../../domain/services/role.repository';
import type { GradeRepository as GradeRepoInterface } from '../../domain/services/grade.repository';

export const enum RepositoryType {
  USER = 'USER',
  SUBJECT = 'SUBJECT',
  ROLE = 'ROLE',
  GRADE = 'GRADE',
}

class RepositoryFactory {
  private static instance: RepositoryFactory;
  private userRepository: UserApiRepository | null = null;
  private subjectRepository: SubjectApiRepository | null = null;
  private roleRepository: RoleApiRepository | null = null;
  private gradeRepository: GradeRepository | null = null;

  private constructor() {}

  public static getInstance(): RepositoryFactory {
    if (!RepositoryFactory.instance) {
      RepositoryFactory.instance = new RepositoryFactory();
    }
    return RepositoryFactory.instance;
  }

  public getUserRepository(): UserRepository {
    if (!this.userRepository) {
      this.userRepository = new UserApiRepository();
    }
    return this.userRepository;
  }

  public getSubjectRepository(): SubjectRepository {
    if (!this.subjectRepository) {
      this.subjectRepository = new SubjectApiRepository();
    }
    return this.subjectRepository;
  }

  public getRoleRepository(): RoleRepository {
    if (!this.roleRepository) {
      this.roleRepository = new RoleApiRepository();
    }
    return this.roleRepository;
  }

  public getGradeRepository(): GradeRepoInterface {
    if (!this.gradeRepository) {
      this.gradeRepository = new GradeRepository();
    }
    return this.gradeRepository;
  }

  public get<T>(type: RepositoryType): T {
    switch (type) {
      case RepositoryType.USER:
        return this.getUserRepository() as T;
      case RepositoryType.SUBJECT:
        return this.getSubjectRepository() as T;
      case RepositoryType.ROLE:
        return this.getRoleRepository() as T;
      case RepositoryType.GRADE:
        return this.getGradeRepository() as T;
      default:
        throw new Error(`Unknown repository type: ${type}`);
    }
  }
}

export const repositoryFactory = RepositoryFactory.getInstance();