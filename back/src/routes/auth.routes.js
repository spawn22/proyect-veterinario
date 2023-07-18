import { Router } from "express";
import {
  Login,
  Register,
  Logout,
  Profile,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
const router = Router();

router.post("/register",validateSchema(registerSchema), Register);

router.post("/login",validateSchema(loginSchema), Login);

router.post("/logout", Logout);

router.get("/profile", authRequired, Profile);

export default router;
