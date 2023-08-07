import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import animalRoutes from "./routes/animal.routes.js";
import shiftRoutes from "./routes/shift.routes.js";

const app = express();
const corsOptions = {
  origin: "https://proyect-veterinario.vercel.app",
  credentials: true,
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://proyect-veterinario.vercel.app"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", animalRoutes);
app.use("/api", shiftRoutes);

export default app;
