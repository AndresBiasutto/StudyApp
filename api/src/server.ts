import app from "./app";
import { env } from "./config/env";
import { initDb } from "./config/initDb";

const bootstrap = async () => {
  await initDb();
  app.listen(env.port, () => {
    console.log(`Servidor listo en el puerto ${env.port}`);
  });
};

void bootstrap().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
