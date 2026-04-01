import { Router } from "express";
import mediaController from "../controllers/media.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { asyncHandler } from "../middlewares/async-handler.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validation.middleware";
import { createMediaSchema } from "../validators/media.validator";

const router = Router();

router.post(
  "/videos",
  authenticateJWT,
  authorizeRoles("teacher"),
  validate(createMediaSchema),
  asyncHandler(mediaController.createVideo.bind(mediaController)),
);
router.post(
  "/images",
  authenticateJWT,
  authorizeRoles("teacher"),
  validate(createMediaSchema),
  asyncHandler(mediaController.createImage.bind(mediaController)),
);
router.get(
  "/videos",
  asyncHandler(mediaController.getAllVideos.bind(mediaController)),
);
router.get(
  "/images",
  asyncHandler(mediaController.getAllImages.bind(mediaController)),
);
// router.get("/", mediaHandler.getAllVideos);
// router.get("/", mediaHandler.getAllImages);
// router.get("/:id", mediaHandler.getOneVideo);
// router.get("/:id", mediaHandler.getOneImage);
// router.put("/:id", mediaHandler.updateVideo);
// router.put("/:id", mediaHandler.updateImage);
// router.delete("/:id", mediaHandler.deleteVideo);
// router.delete("/:id", mediaHandler.deleteImage);

export default router;
