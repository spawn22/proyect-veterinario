import { Router } from "express";
import {
  createPatientAnimal,
  deletePatientAnimal,
  getAllPatientsAnimals,
  EditPatientAnimal,
} from "../controllers/animal.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createAnimalSchema } from "../schemas/animal.schema.js";
const router = Router();

router.get("/patient", authRequired, getAllPatientsAnimals);
router.post(
  "/patient",
  authRequired,
  validateSchema(createAnimalSchema),
  createPatientAnimal
);
router.put("/patient/:id", authRequired, EditPatientAnimal);
router.delete("/patient/:id", authRequired, deletePatientAnimal);

export default router;
