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


router.route("/shift").get(authRequired, getShifts);
router.route("/shift").post(authRequired, validateSchema(createShiftSchema), postShifts);
router.route("/shift/:id").put( authRequired, editShifts);
router.route("/shift/:id").delete(authRequired, deleteShifts);

export default router;
