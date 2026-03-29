// src/app.ts
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/error-handler.middleware";
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
