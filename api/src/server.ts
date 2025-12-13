// src/server.ts
import app from "./app";
import { initDb } from "./config/initDb";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3001;

(async () => {
  await initDb();
  app.listen(PORT, () => {
    console.log(`Servidor listo en el puerto ${PORT}`);
  });
})();
