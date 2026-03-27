import { Router } from "express";
import mediaController from "../controllers/media.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

router.post("/videos", authenticateJWT, authorizeRoles("teacher"), mediaController.createVideo);
router.post("/images", authenticateJWT, authorizeRoles("teacher"), mediaController.createImage);
router.get("/videos", mediaController.getAllVideos);
router.get("/images", mediaController.getAllImages);
// router.get("/", mediaHandler.getAllVideos);
// router.get("/", mediaHandler.getAllImages);
// router.get("/:id", mediaHandler.getOneVideo);
// router.get("/:id", mediaHandler.getOneImage);
// router.put("/:id", mediaHandler.updateVideo);
// router.put("/:id", mediaHandler.updateImage);
// router.delete("/:id", mediaHandler.deleteVideo);
// router.delete("/:id", mediaHandler.deleteImage);

export default router;
