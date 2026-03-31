import { NextFunction, Response } from "express";
import sequelize from "../config/database";
import { AuthRequest } from "./auth.middleware";
import {
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from "../utils/errors";

const { Subject, Unit, Chapter } = sequelize.models;

const getSubjectOwnerId = async (id_subject: string): Promise<string | null> => {
  const subject = await Subject.findByPk(id_subject);
  if (!subject) {
    return null;
  }

  const data = subject.get({ plain: true }) as { id_user?: string };
  return data.id_user ?? null;
};

const getUnitOwnerId = async (id_unit: string): Promise<string | null> => {
  const unit = await Unit.findByPk(id_unit, {
    include: [
      {
        model: Subject,
        as: "subjectUnits",
        attributes: ["id_user"],
      },
    ],
  });

  if (!unit) {
    return null;
  }

  const data = unit.get({
    plain: true,
  }) as { subjectUnits?: { id_user?: string | null } | null };

  return data.subjectUnits?.id_user ?? null;
};

const getChapterOwnerId = async (
  id_chapter: string,
): Promise<string | null> => {
  const chapter = await Chapter.findByPk(id_chapter, {
    include: [
      {
        model: Unit,
        as: "UnitChapters",
        attributes: ["id_unit"],
        include: [
          {
            model: Subject,
            as: "subjectUnits",
            attributes: ["id_user"],
          },
        ],
      },
    ],
  });

  if (!chapter) {
    return null;
  }

  const data = chapter.get({
    plain: true,
  }) as {
    UnitChapters?: {
      subjectUnits?: {
        id_user?: string | null;
      } | null;
    } | null;
  };

  return data.UnitChapters?.subjectUnits?.id_user ?? null;
};

const ensureOwner = (
  ownerId: string | null,
  currentUserId: string | undefined,
  resourceName: string,
) => {
  if (!currentUserId) {
    throw new ForbiddenError("No autorizado");
  }

  if (!ownerId) {
    throw new NotFoundError(`${resourceName} not found`);
  }

  if (ownerId !== currentUserId) {
    throw new ForbiddenError(
      `No tienes permisos para modificar este ${resourceName}`,
    );
  }
};

export const ensureTeacherOwnsSubjectFromBody =
  (fieldName = "id_subject") =>
  async (req: AuthRequest, _res: Response, next: NextFunction) => {
    try {
      const id_subject = req.body?.[fieldName];
      if (!id_subject || typeof id_subject !== "string") {
        throw new ValidationError(`${fieldName} es necesario`);
      }

      const ownerId = await getSubjectOwnerId(id_subject);
      ensureOwner(ownerId, req.user?.id_user, "subject");

      return next();
    } catch (error) {
      return next(error);
    }
  };

export const ensureTeacherOwnsUnitFromBody =
  (fieldName = "id_unit") =>
  async (req: AuthRequest, _res: Response, next: NextFunction) => {
    try {
      const id_unit = req.body?.[fieldName];
      if (!id_unit || typeof id_unit !== "string") {
        throw new ValidationError(`${fieldName} es necesario`);
      }

      const ownerId = await getUnitOwnerId(id_unit);
      ensureOwner(ownerId, req.user?.id_user, "unit");

      return next();
    } catch (error) {
      return next(error);
    }
  };

export const ensureTeacherOwnsUnitByParam =
  (paramName = "id") =>
  async (req: AuthRequest, _res: Response, next: NextFunction) => {
    try {
      const id_unit = req.params?.[paramName];
      if (!id_unit || typeof id_unit !== "string") {
        throw new ValidationError(`${paramName} es necesario`);
      }

      const ownerId = await getUnitOwnerId(id_unit);
      ensureOwner(ownerId, req.user?.id_user, "unit");

      return next();
    } catch (error) {
      return next(error);
    }
  };

export const ensureTeacherOwnsChapterByParam =
  (paramName = "id") =>
  async (req: AuthRequest, _res: Response, next: NextFunction) => {
    try {
      const id_chapter = req.params?.[paramName];
      console.log(`[Ownership] Checking chapter: ${id_chapter} from param: ${paramName}`);
      if (!id_chapter || typeof id_chapter !== "string") {
        throw new ValidationError(`${paramName} es necesario`);
      }

      const ownerId = await getChapterOwnerId(id_chapter);
      console.log(`[Ownership] Found owner: ${ownerId} for chapter: ${id_chapter}`);
      ensureOwner(ownerId, req.user?.id_user, "chapter");

      return next();
    } catch (error) {
      console.error(`[Ownership] Error: ${error instanceof Error ? error.message : error}`);
      return next(error);
    }
  };
