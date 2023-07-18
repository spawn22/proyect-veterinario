import { Router } from "express";
import {
  getShifts,
  postShifts,
  editShifts,
  deleteShifts,
} from "../controllers/shift.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
const router = Router();

router.get("/shift", authRequired, getShifts);
router.post("/shift", authRequired, postShifts);
router.put("/shift/:id", authRequired, editShifts);
router.delete("/shift/:id", authRequired, deleteShifts);

export default router;
