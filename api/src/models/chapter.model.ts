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
    summary: DataTypes.TEXT,
    content_html: DataTypes.TEXT,
    video_url: DataTypes.STRING,
    image_urls: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    },
    resource_links: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    },
    status: {
      type: DataTypes.ENUM("draft", "published"),
      allowNull: false,
      defaultValue: "draft",
    },
    published_at: DataTypes.DATE,
    id_unit: DataTypes.UUID,
  });
};
