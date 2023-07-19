import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
const router = Router();

router.route("/register").post(validateSchema(registerSchema), register);

router.route("/login").post(validateSchema(loginSchema), login);

router.route("/logout").post( logout);

router.route("/profile").get(authRequired, profile);

export default router;
