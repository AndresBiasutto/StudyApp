import sequelize from "../config/database";

const { Video, Image } = sequelize.models;

class MediaRepository {
  async createVideo(data: any) {
    return Video.create(data);
  }
  async createImage(data: any) {
    return Image.create(data);
  }

  async getVideo(id_video: string) {
    return Video.findByPk(id_video);
  }
  async getImage(id_image: string) {
    return Image.findByPk(id_image);
  }

  async getAllVideos() {
    return Video.findAll();
  }
  async getAllImages() {
    return Image.findAll();
  }

//   async getRoleByName(name: string) {
//     return Role.findOne({ where: { name } });
//   }

//   async updateRole(id_role: string, data: any) {
//     const role = await Role.findByPk(id_role);
//     if (!role) return null;
//     return role.update(data);
//   }

//   async deleteRole(id_role: string) {
//     return Role.destroy({ where: { id_role } });
//   }
}

export default new MediaRepository();