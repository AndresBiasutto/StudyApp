import { sequelize } from "./database";
import { env } from "./env";

export const initDb = async (): Promise<void> => {
  await sequelize.authenticate();
  console.log("Database connected");

  if (env.db.syncMode === "alter") {
    console.warn(
      "DB_SYNC_MODE=alter habilitado. Esto es temporal hasta migrar a migraciones explicitas.",
    );
    await sequelize.sync({ alter: true });
    console.log("Models synced with alter");
    return;
  }

  console.log(
    "Automatic schema sync disabled. Apply migrations manually before starting the app.",
  );
};
// , el esquema ya no se altera solo al iniciar. Si necesitas que Sequelize
//  sincronice temporalmente las tablas, tendrás que agregar en
//  .env DB_SYNC_MODE=alter. Si no, lo correcto es dejarlo como está 
// y levantar la base ya migrada.