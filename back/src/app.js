import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import animalRoutes from "./routes/animal.routes.js";
import shiftRoutes from "./routes/shift.routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", animalRoutes);
app.use("/api", shiftRoutes);

export default app;
