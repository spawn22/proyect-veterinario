import { Router } from "express";
import {
  getShifts,
  postShifts,
  editShifts,
  deleteShifts,
} from "../controllers/shift.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createShiftSchema } from "../schemas/shift.schema.js";
const router = Router();

router.get("/shift", authRequired, getShifts);
router.post(
  "/shift",
  authRequired,
  validateSchema(createShiftSchema),
  postShifts
);
router.put("/shift/:id", authRequired, editShifts);
router.delete("/shift/:id", authRequired, deleteShifts);

export default router;
