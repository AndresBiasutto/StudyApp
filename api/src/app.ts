// src/app.ts
import express from "express";
import cors, { type CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { env } from "./config/env";
import routes from "./routes";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/error-handler.middleware";
const app = express();

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin || env.corsOrigins.length === 0 || env.corsOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
