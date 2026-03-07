import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  sequelize.define("User", {
    id_user: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    description: DataTypes.STRING,
    e_mail: { type: DataTypes.STRING, allowNull: false, unique: true },
    contact_number: DataTypes.STRING,
    image: DataTypes.STRING,
  });
};
