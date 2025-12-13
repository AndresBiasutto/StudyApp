import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  sequelize.define("Chapter", {
    id_chapter: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.STRING,
    order: DataTypes.INTEGER,
    id_unit: DataTypes.UUID,
  });
};
