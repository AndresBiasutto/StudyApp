import { Router } from "express";
import mediaHandler from "../handlers/media.handler";

const router = Router();

router.post("/videos", mediaHandler.createVideo);
router.post("/images", mediaHandler.createImage);
router.get("/videos", mediaHandler.getAllVideos);
router.get("/images", mediaHandler.getAllImages);
// router.get("/", mediaHandler.getAllVideos);
// router.get("/", mediaHandler.getAllImages);
// router.get("/:id", mediaHandler.getOneVideo);
// router.get("/:id", mediaHandler.getOneImage);
// router.put("/:id", mediaHandler.updateVideo);
// router.put("/:id", mediaHandler.updateImage);
// router.delete("/:id", mediaHandler.deleteVideo);
// router.delete("/:id", mediaHandler.deleteImage);

export default router;
