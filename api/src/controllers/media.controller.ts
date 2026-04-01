import { Request, Response } from "express";

import mediaService from "../services/media.service";

class MediaController {
  async createVideo(req: Request, res: Response) {
    const video = await mediaService.createVideo(req.body);
    res.status(201).json(video);
  }

  async createImage(req: Request, res: Response) {
    const image = await mediaService.createImage(req.body);
    res.status(201).json(image);
  }

  async getAllVideos(_req: Request, res: Response) {
    const medias = await mediaService.getAllVideos();
    res.json(medias);
  }

  async getAllImages(_req: Request, res: Response) {
    const medias = await mediaService.getAllImages();
    res.json(medias);
  }
}

export default new MediaController();
