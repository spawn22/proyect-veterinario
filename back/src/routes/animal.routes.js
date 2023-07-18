import { Router } from "express";
import {
  createPatientAnimal,
  deletePatientAnimal,
  getAllPatientsAnimals,
  EditPatientAnimal,
} from "../controllers/animal.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
const router = Router();

router.get("/patient", authRequired, getAllPatientsAnimals);
router.post("/patient", authRequired, createPatientAnimal);
router.put("/patient/:id", authRequired, EditPatientAnimal);
router.delete("/patient/:id", authRequired, deletePatientAnimal);

export default router;
