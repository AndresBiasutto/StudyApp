import { Router } from "express";
import calendarController from "../controllers/calendar.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { asyncHandler } from "../middlewares/async-handler.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  calendarIdParamSchema,
  createCalendarSchema,
  updateCalendarSchema,
} from "../validators/calendar.validator";

const router = Router();

router.post(
  "/",
  authenticateJWT,
  validate(createCalendarSchema),
  asyncHandler(calendarController.create.bind(calendarController)),
);

router.get(
  "/",
  authenticateJWT,
  asyncHandler(calendarController.getAll.bind(calendarController)),
);

router.get(
  "/:id",
  authenticateJWT,
  validate(calendarIdParamSchema),
  asyncHandler(calendarController.getOne.bind(calendarController)),
);

router.put(
  "/:id",
  authenticateJWT,
  validate(updateCalendarSchema),
  asyncHandler(calendarController.update.bind(calendarController)),
);

router.delete(
  "/:id",
  authenticateJWT,
  validate(calendarIdParamSchema),
  asyncHandler(calendarController.delete.bind(calendarController)),
);

export default router;
