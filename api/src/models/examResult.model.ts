import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  sequelize.define(
    "ExamResult",
    {
      id_exam_result: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      id_exam: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      id_user: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      id_subject: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      id_chapter: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_questions: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      submitted_answers: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["id_user", "id_chapter"],
        },
      ],
    },
  );
};
