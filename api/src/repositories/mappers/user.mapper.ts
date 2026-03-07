import { Model } from "sequelize";
import { UserEntity } from "../entities/userEntity.entity";

export const mapUserModelToEntity = (user: Model<any, any>): UserEntity => {
  const data = user.get({ plain: true }) as any;

  return {
    id_user: data.id_user,
    name: data.name,
    last_name: data.last_name,
    e_mail: data.e_mail,
    image: data.image,
    Role: data.Role
      ? {
          id_role: data.Role.id_role,
          name: data.Role.name,
        }
      : undefined,
  };
};
