import MediaRepository from "../repositories/media.repository";

class MediaService {
  async createVideo(data: any) {
    return MediaRepository.createVideo(data);
  }
  async createImage(data: any) {
    return MediaRepository.createImage(data);
  }

//   async getRole(id_role: string) {
//     const role = await MediaRepository.getRole(id_role);
//     if (!role) throw new Error("Role not found");
//     return role;
//   }

   async getAllVideos() {
     return MediaRepository.getAllVideos();
   }
   async getAllImages() {
     return MediaRepository.getAllImages();
   }

//   async getRoleByName(name: string) {
//     return MediaRepository.getRoleByName(name);
//   }

//   async updateRole(id_role: string, data: any) {
//     const Role = await MediaRepository.updateRole(id_role, data);
//     if (!Role) throw new Error("Role not found");
//     return Role;
//   }

//   async deleteRole(id_role: string) {
//     const deleted = await MediaRepository.deleteRole(id_role);
//     if (!deleted) throw new Error("Role not found");
//     return true;
//   }
}

export default new MediaService();
