import { Request, Response } from "express";
import mediaController from "../controllers/media.controller";

class MediaHandler {
  async createVideo(req: Request, res: Response) {
    try {
      const video = await mediaController.createVideo(req.body);
      res.status(201).json(video);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
  async createImage(req: Request, res: Response) {
    try {
      const image = await mediaController.createImage(req.body);
      res.status(201).json(image);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

//   async getOne(req: Request, res: Response) {
//     try {
//       const media = await mediaController.getOne(req.params.id);
//       res.json(media);
//     } catch (err: any) {
//       res.status(404).json({ error: err.message });
//     }
//   }

async getAllVideos(req: Request, res: Response) {
  try {
    const medias = await mediaController.getAllVideos();
    res.json(medias);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
async getAllImages(req: Request, res: Response) {
  try {
    const medias = await mediaController.getAllImages();
    res.json(medias);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

//   async getByName(req: Request, res: Response) {
//     try {
//       const media = await mediaController.getByName(req.params.name);
//       if (!media) return res.status(404).json({ error: "Media not found" });
//       res.json(media);
//     } catch (err: any) {
//       res.status(500).json({ error: err.message });
//     }
//   }

//   async update(req: Request, res: Response) {
//     try {
//       const updated = await mediaController.update(req.params.id, req.body);
//       res.json(updated);
//     } catch (err: any) {
//       res.status(404).json({ error: err.message });
//     }
//   }

//   async delete(req: Request, res: Response) {
//     try {
//       mediaController.delete(req.params.id);
//       res.json({ message: "Media deleted" });
//     } catch (err: any) {
//       res.status(404).json({ error: err.message });
//     }
//   }
}

export default new MediaHandler();
