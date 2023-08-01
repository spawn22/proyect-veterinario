import Animal from "../models/animal.model.js";

export const createPatientAnimal = async (req, res) => {
  const {
    animalName,
    animalOwner,
    animalType,
    animalAge,
    animalGender,
    animalBreed,
    animalWeight,
  } = req.body;

  const newPatient = new Animal({
    animalName,
    animalOwner,
    animalType,
    animalAge,
    animalGender,
    animalBreed,
    animalWeight,
    user: req.user.id,
  });
  try {
    await newPatient.save();
    res.status(200).json(newPatient);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllPatientsAnimals = async (req, res) => {
  try {
    const allPatients = await Animal.find({
        user: req.user.id
    }).populate("user");
    res.status(200).json(allPatients);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const editPatientAnimal = async (req, res) => {
  try {
    const editPatient = await Animal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send(editPatient);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deletePatientAnimal = async (req, res) => {
  try {
    const deletePatient = await Animal.findByIdAndDelete(req.params.id);
    if(!deletePatient) return res.status(404).json({message: "Patient not found"})
    res.status(200).json({
      message: "Patient deleted successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
