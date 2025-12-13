import mediaService from "../services/media.service";

class MediaController {
  createVideo(newVideo: object) {
    return mediaService.createVideo(newVideo);
  }
  createImage(newImage: object) {
    return mediaService.createImage(newImage);
  }
//   getOne(id_role: string) {
//     return mediaService.getRole(id_role);
//   }
 getAllVideos() {
   return mediaService.getAllVideos();
 }
 getAllImages() {
   return mediaService.getAllImages();
 }
//   getByName(name: string) {
//     return mediaService.getRoleByName(name);
//   }
//   update(id_role: string, data: object) {
//     return mediaService.updateRole(id_role, data);
//   }
//   delete(id_role: string) {
//     mediaService.deleteRole(id_role);
//   }
}

export default new MediaController();
