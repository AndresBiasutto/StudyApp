import { Router } from "express";
import chapterController from "../controllers/chapter.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { asyncHandler } from "../middlewares/async-handler.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  ensureTeacherOwnsChapterByParam,
  ensureTeacherOwnsUnitFromBody,
} from "../middlewares/ownership.middleware";
import {
  chapterIdParamSchema,
  createChapterSchema,
  publishChapterSchema,
  saveChapterDraftSchema,
  updateChapterSchema,
} from "../validators/chapter.validator";

const router = Router();

router.post(
  "/",
  authenticateJWT,
  authorizeRoles("teacher"),
  validate(createChapterSchema),
  ensureTeacherOwnsUnitFromBody(),
  asyncHandler(chapterController.create.bind(chapterController)),
);
router.get("/", asyncHandler(chapterController.getAll.bind(chapterController)));
router.get(
  "/:id",
  validate(chapterIdParamSchema),
  asyncHandler(chapterController.getOne.bind(chapterController)),
);
router.put(
  "/:id/draft",
  authenticateJWT,
  authorizeRoles("teacher"),
  validate(saveChapterDraftSchema),
  ensureTeacherOwnsChapterByParam(),
  asyncHandler(chapterController.saveDraft.bind(chapterController)),
);
router.put(
  "/:id/publish",
  authenticateJWT,
  authorizeRoles("teacher"),
  validate(publishChapterSchema),
  ensureTeacherOwnsChapterByParam(),
  asyncHandler(chapterController.publish.bind(chapterController)),
);
router.put(
  "/:id",
  authenticateJWT,
  authorizeRoles("teacher"),
  validate(updateChapterSchema),
  ensureTeacherOwnsChapterByParam(),
  asyncHandler(chapterController.update.bind(chapterController)),
);
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRoles("teacher"),
  validate(chapterIdParamSchema),
  ensureTeacherOwnsChapterByParam(),
  asyncHandler(chapterController.delete.bind(chapterController)),
);

export default router;
