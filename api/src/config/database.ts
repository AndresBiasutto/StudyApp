import fs from "fs";
import path from "path";

import { Sequelize } from "sequelize";

import { env } from "./env";

export const sequelize = new Sequelize(env.db.name, env.db.user, env.db.pass, {
  host: env.db.host,
  port: env.db.port,
  dialect: "postgres",
});

const modelsDir = path.join(__dirname, "../models");
const modelDefiners: Array<(sequelize: Sequelize) => void> = [];

fs.readdirSync(modelsDir)
  .filter(
    (file) =>
      (file.endsWith(".ts") || file.endsWith(".js")) &&
      file !== "index.ts" &&
      file !== "index.js" &&
      !file.endsWith(".d.ts"),
  )
  .forEach((file) => {
    const imported = require(path.join(modelsDir, file));
    const defineModel =
      typeof imported.default === "function"
        ? imported.default
        : typeof imported === "function"
          ? imported
          : null;

    if (!defineModel) {
      console.warn(`El archivo ${file} no exporta un modelo valido.`);
      return;
    }

    modelDefiners.push(defineModel as (sequelize: Sequelize) => void);
  });

modelDefiners.forEach((defineModel) => defineModel(sequelize));

const { User, Subject, Role, Grade, Unit, Chapter, Video, Image } =
  sequelize.models;

if (User && Subject && Role && Grade && Unit && Chapter && Video && Image) {
  User.belongsTo(Role, { foreignKey: "id_role" });
  Subject.belongsTo(Grade, { foreignKey: "id_grade" });

  User.hasMany(Subject, { as: "createdSubjects", foreignKey: "id_user" });
  Subject.belongsTo(User, { as: "creator", foreignKey: "id_user" });

  User.belongsToMany(Subject, {
    through: "SubjectStudents",
    as: "enrolledSubjects",
    foreignKey: "id_user",
    otherKey: "id_subject",
  });
  Subject.belongsToMany(User, {
    through: "SubjectStudents",
    as: "students",
    foreignKey: "id_subject",
    otherKey: "id_user",
  });

  Subject.hasMany(Unit, { as: "createdUnits", foreignKey: "id_subject" });
  Unit.belongsTo(Subject, { as: "subjectUnits", foreignKey: "id_subject" });

  Unit.hasMany(Chapter, { as: "createdChapters", foreignKey: "id_unit" });
  Chapter.belongsTo(Unit, { as: "UnitChapters", foreignKey: "id_unit" });

  Chapter.hasMany(Video, { as: "createdVideos", foreignKey: "id_chapter" });
  Video.belongsTo(Chapter, { as: "ChapterVideos", foreignKey: "id_chapter" });

  Chapter.hasMany(Image, { as: "createdImages", foreignKey: "id_chapter" });
  Image.belongsTo(Chapter, { as: "ChapterImages", foreignKey: "id_chapter" });
} else {
  console.error("ERROR: algun modelo no esta definido.");
}

export default sequelize;
