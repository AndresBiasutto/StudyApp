import { Request, Response } from "express";
import mediaService from "../services/media.service";

class MediaController {
  async createVideo(req: Request, res: Response) {
    try {
      const video = await mediaService.createVideo(req.body);
      res.status(201).json(video);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async createImage(req: Request, res: Response) {
    try {
      const image = await mediaService.createImage(req.body);
      res.status(201).json(image);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async getAllVideos(req: Request, res: Response) {
    try {
      const medias = await mediaService.getAllVideos();
      res.json(medias);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async getAllImages(req: Request, res: Response) {
    try {
      const medias = await mediaService.getAllImages();
      res.json(medias);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new MediaController();
