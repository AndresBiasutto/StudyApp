// src/config/database.ts
import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";
// import dotenv from "dotenv";
import dotenv from "dotenv";
dotenv.config({ path: "/custom/path/.env" });
export const sequelize = new Sequelize(
  process.env.DB_NAME || "campus",
  process.env.DB_USER || "postgres",
  process.env.DB_PASS || "1234",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
  }
);
const modelsDir = path.join(__dirname, "../models");
const modelDefiners: any[] = [];
fs.readdirSync(modelsDir)
  .filter((file) => file.endsWith(".ts") && file !== "index.ts") // evitar index.ts
  .forEach((file) => {
    const imported = require(path.join(modelsDir, file));
    const defineModel =
      typeof imported.default === "function"
        ? imported.default
        : typeof imported === "function"
        ? imported
        : null;
    if (!defineModel) {
      console.warn(`⚠️ El archivo ${file} no exporta un modelo válido.`);
      return;
    }
    modelDefiners.push(defineModel);
  });
modelDefiners.forEach((defineModel) => defineModel(sequelize));
const { User, Subject, Role, Unit, Chapter, Video, Image } = sequelize.models;


if (User && Subject && Role) {
  User.belongsTo(Role, { foreignKey: "id_role" });

  User.hasMany(Subject, { as: "createdSubjects", foreignKey: "id_user" });
  Subject.belongsTo(User, { as: "creator", foreignKey: "id_user" });

  Subject.hasMany(Unit, { as: "createdUnits", foreignKey: "id_subject" });
  Unit.belongsTo(Subject, { as: "subjectUnits", foreignKey: "id_subject" });

  Unit.hasMany(Chapter, { as: "createdChapters", foreignKey: "id_unit" });
  Chapter.belongsTo(Unit, { as: "UnitChapters", foreignKey: "id_unit" });

  Chapter.hasMany(Video, { as: "createdVideos", foreignKey: "id_chapter" });
  Video.belongsTo(Chapter, { as: "ChapterVideos", foreignKey: "id_chapter" });

  Chapter.hasMany(Image, { as: "createdImages", foreignKey: "id_chapter" });
  Image.belongsTo(Chapter, { as: "ChapterImages", foreignKey: "id_chapter" });
} else {
  console.error("❌ ERROR: User o Subject no están definidos.");
}

export default sequelize;
