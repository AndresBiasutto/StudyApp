import { sequelize } from "./database";

export const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    await sequelize.sync({ alter: true });
    console.log("Models synced");
  } catch (err) {
    console.error("DB error:", err);
  }
};
