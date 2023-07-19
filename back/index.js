import app from "./src/app.js";
import dotenv from "dotenv";
import { connectDb } from "./src/db.js";

dotenv.config();

connectDb();

app.listen(3000, () => console.log("Server on port", 3000));
