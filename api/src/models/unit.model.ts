import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  sequelize.define("Unit", {
    id_unit: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.STRING,
    order: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    id_subject: DataTypes.UUID,
  });
};
