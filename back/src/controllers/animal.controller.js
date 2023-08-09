// Importa el modelo `Animal` desde el archivo `animal.model.js` en el directorio `models`.
import Animal from "../models/animal.model.js";

// Controlador para crear nuevos pacientes de animales.
export const createPatientAnimal = async (req, res) => {
  // Desestructura el objeto `req.body` para obtener los datos del animal que se va a crear.
  const { name, owner, type, age, gender, breed, weight, description } =
    req.body;

  // Crea un nuevo objeto `Animal` con los datos del objeto desestructurado y el ID del usuario que lo crea.
  const newPatient = new Animal({
    name,
    owner,
    type,
    age,
    gender,
    breed,
    weight,
    description,
    user: req.user.id,
  });
  try {
    // Guarda el nuevo Animal creado en la base de datos.
    await newPatient.save();
    // Envía una respuesta con el estado 200 (OK) y el objeto del nuevo animal creado.
    res.status(200).json(newPatient);
  } catch (error) {
    // Envía una respuesta con el estado 500 (Internal Server Error) y los detalles del error.
    res.status(500).json(error);
  }
};

// Controlador para obtener todos los pacientes de animales del usuario.
export const getAllPatientsAnimals = async (req, res) => {
  try {
    // Busca en la base de datos todos los pacientes de animales que pertenecen al usuario autenticado mediante el objeto `req.user.id`.
    const allPatients = await Animal.find({
      user: req.user.id,
    }).populate("user");
    // Envía una respuesta con el estado 200 (OK) y los detalles de todos los pacientes de animales obtenidos.
    res.status(200).json(allPatients);
  } catch (error) {
    // Envía una respuesta con el estado 500 (Internal Server Error) y los detalles del error.
    res.status(500).json(error);
  }
};

// Controlador para editar y actualizar los detalles de un paciente de animal existente.
export const editPatientAnimal = async (req, res) => {
  try {
    // Busca en la base de datos el paciente de animal correspondiente y actualiza sus detalles utilizando el método `findByIdAndUpdate()`.
    const editPatient = await Animal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    // Envía una respuesta con el estado 200 (OK) y los detalles del paciente de animal actualizado.
    res.status(200).send(editPatient);
  } catch (error) {
    // Envía una respuesta con el estado 500 (Internal Server Error) y los detalles del error.
    res.status(500).json(error);
  }
};

// Controlador para eliminar un paciente de un animal de la base de datos.
export const deletePatientAnimal = async (req, res) => {
  try {
    // Busca el paciente de animal correspondiente mediante su ID y elimina el objeto de la base de datos utilizando el método `findByIdAndDelete()`.
    const deletePatient = await Animal.findByIdAndDelete(req.params.id);
    // Si el objeto eliminado no existe, envía una respuesta 404 (Not Found) al cliente con un mensaje indicando que no se ha encontrado el pacientee.
    if (!deletePatient)
      return res.status(404).json({ message: "Patient not found" });
    // Envía una respuesta con el estado 200 (OK) y un mensaje de éxito indicando que el paciente ha sido eliminado.
    res.status(200).json({
      message: "Patient deleted successfully",
    });
  } catch (error) {
    // Envía una respuesta con estado 500 (Internal Server Error) y los detalles del error en la carga útil en formato JSON.
    res.status(500).json(error);
  }
};
