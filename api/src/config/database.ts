import fs from "fs";
import path from "path";

import { Sequelize, type Options } from "sequelize";

import { env } from "./env";

const sequelizeOptions: Options = {
  host: env.db.host,
  port: env.db.port,
  dialect: "postgres",
};

if (env.db.sslMode === "require") {
  sequelizeOptions.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

export const sequelize = env.db.url
  ? new Sequelize(env.db.url, sequelizeOptions)
  : new Sequelize(env.db.name, env.db.user, env.db.pass, sequelizeOptions);

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

const {
  User,
  Subject,
  Role,
  Grade,
  Unit,
  Chapter,
  Video,
  Image,
  Exam,
  ExamResult,
} = sequelize.models;

if (
  User &&
  Subject &&
  Role &&
  Grade &&
  Unit &&
  Chapter &&
  Video &&
  Image &&
  Exam &&
  ExamResult
) {
  User.belongsTo(Role, { foreignKey: "id_role" });
  Subject.belongsTo(Grade, { foreignKey: "id_grade" });

  User.hasMany(Subject, {
    as: "createdSubjects",
    foreignKey: "id_user",
    onDelete: "CASCADE",
    hooks: true,
  });
  Subject.belongsTo(User, {
    as: "creator",
    foreignKey: "id_user",
    onDelete: "CASCADE",
  });

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

  Subject.hasMany(Unit, {
    as: "createdUnits",
    foreignKey: "id_subject",
    onDelete: "CASCADE",
    hooks: true,
  });
  Unit.belongsTo(Subject, {
    as: "subjectUnits",
    foreignKey: "id_subject",
    onDelete: "CASCADE",
  });

  Unit.hasMany(Chapter, {
    as: "createdChapters",
    foreignKey: "id_unit",
    onDelete: "CASCADE",
    hooks: true,
  });
  Chapter.belongsTo(Unit, {
    as: "UnitChapters",
    foreignKey: "id_unit",
    onDelete: "CASCADE",
  });

  Chapter.hasMany(Video, {
    as: "createdVideos",
    foreignKey: "id_chapter",
    onDelete: "CASCADE",
    hooks: true,
  });
  Video.belongsTo(Chapter, {
    as: "ChapterVideos",
    foreignKey: "id_chapter",
    onDelete: "SET NULL",
  });

  Chapter.hasMany(Image, {
    as: "createdImages",
    foreignKey: "id_chapter",
    onDelete: "CASCADE",
    hooks: true,
  });
  Image.belongsTo(Chapter, {
    as: "ChapterImages",
    foreignKey: "id_chapter",
    onDelete: "SET NULL",
  });

  Chapter.hasOne(Exam, {
    as: "exam",
    foreignKey: "id_chapter",
    onDelete: "CASCADE",
    hooks: true,
  });
  Exam.belongsTo(Chapter, {
    as: "chapter",
    foreignKey: "id_chapter",
    onDelete: "CASCADE",
  });

  User.hasMany(ExamResult, { as: "examResults", foreignKey: "id_user" });
  ExamResult.belongsTo(User, { as: "student", foreignKey: "id_user" });

  Subject.hasMany(ExamResult, { as: "examResults", foreignKey: "id_subject" });
  ExamResult.belongsTo(Subject, { as: "subject", foreignKey: "id_subject" });

  Chapter.hasMany(ExamResult, {
    as: "examResults",
    foreignKey: "id_chapter",
    onDelete: "CASCADE",
    hooks: true,
  });
  ExamResult.belongsTo(Chapter, {
    as: "chapterResult",
    foreignKey: "id_chapter",
    onDelete: "CASCADE",
  });

  Exam.hasMany(ExamResult, {
    as: "results",
    foreignKey: "id_exam",
    onDelete: "CASCADE",
    hooks: true,
  });
  ExamResult.belongsTo(Exam, {
    as: "exam",
    foreignKey: "id_exam",
    onDelete: "CASCADE",
  });
} else {
  console.error("ERROR: algun modelo no esta definido.");
}

export default sequelize;
