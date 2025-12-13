import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  sequelize.define("Subject", {
    id_subject: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    id_user: DataTypes.UUID,
  });
};
