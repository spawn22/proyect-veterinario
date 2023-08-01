import { Router } from "express";
import {
  createPatientAnimal,
  deletePatientAnimal,
  getAllPatientsAnimals,
  editPatientAnimal,
} from "../controllers/animal.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createAnimalSchema } from "../schemas/animal.schema.js";
const router = Router();

// router.route("/patient").get(getAllPatientsAnimals);
router.route("/patient").get(authRequired, getAllPatientsAnimals);
// router.route("/patient").post(validateSchema(createAnimalSchema), createPatientAnimal);
router.route("/patient").post(authRequired, validateSchema(createAnimalSchema), createPatientAnimal);
router.route("/patient/:id").put(authRequired, editPatientAnimal);
router.route("/patient/:id").delete(authRequired, deletePatientAnimal);
export default router;
