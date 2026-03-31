const path = require("path");
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, ".env") });

const sequelize = new Sequelize(
  process.env.DB_NAME || "campus",
  process.env.DB_USER || "postgres",
  process.env.DB_PASS || "1234",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false,
  }
);

require("./dist/models/user.model").default(sequelize);
require("./dist/models/role.model").default(sequelize);
require("./dist/models/subject.model").default(sequelize);
require("./dist/models/unit.model").default(sequelize);
require("./dist/models/chapter.model").default(sequelize);
require("./dist/models/videoUrl.model").default(sequelize);
require("./dist/models/ImageUrl.model").default(sequelize);


const { User, Subject, Role, Grade, Unit, Chapter, VideoUrl, ImageUrl } = sequelize.models;

// Associations (minimal needed)
Unit.hasMany(Chapter, { as: "createdChapters", foreignKey: "id_unit" });
Chapter.belongsTo(Unit, { as: "UnitChapters", foreignKey: "id_unit" });

Subject.hasMany(Unit, { as: "createdUnits", foreignKey: "id_subject" });
Unit.belongsTo(Subject, { as: "subjectUnits", foreignKey: "id_subject" });

async function check() {
  try {
    const id = "d916342f-2c2f-4ae8-84e9-d6321ce983b8"; // Latest ID from user log
    const chapter = await Chapter.findByPk(id, {
      include: [
        {
          model: Unit,
          as: "UnitChapters",
          include: [
            {
              model: Subject,
              as: "subjectUnits"
            }
          ]
        }
      ]
    });

    if (!chapter) {
      console.log("CHAPTER NOT FOUND IN DB");
    } else {
      console.log("CHAPTER FOUND:", JSON.stringify(chapter.toJSON(), null, 2));
    }
  } catch (error) {
    console.error("ERROR", error);
  } finally {
    await sequelize.close();
  }
}

check();
