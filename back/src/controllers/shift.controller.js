// Importa el modelo `Shift` desde el archivo `shifts.model.js` en el directorio `models`.
import Shift from "../models/shifts.model.js";

// Controlador para obtener todos los turnos de trabajo pertenecientes al usuario.
export const getShifts = async (req, res) => {
  try {
    // Busca en la base de datos todos los turnos de trabajo que son propiedad del usuario autenticado, utilizando la autenticación con el objeto `req.user.id`.
    const shifts = await Shift.find({
      user: req.user.id,
    }).populate("animal");
    // Retorna una respuesta con el estado 200 (OK) y los detalles de todos los turnos de trabajo obtenidos.
    res.status(200).json(shifts);
  } catch (error) {
    // Envía una respuesta con el estado 500 (Internal Server Error) y los detalles del error en la carga útil del objeto JSON.
    res.status(500).json({ message: error.message });
  }
};

// Controlador para crear un nuevo turno de trabajo
export const postShifts = async (req, res) => {
  // Desestructura el objeto `req.body` para obtener los datos del nuevo turno de trabajo.
  const { description, date, start_time, animal } = req.body;
  // Crea un nuevo objeto `Shift` con los datos del objeto desestructurado y el ID del usuario que lo está creando.
  const newShift = new Shift({
    description,
    date,
    start_time,
    animal,
    user: req.user.id,
  });
  try {
    // Guarda el nuevo objeto `Shift` creado en la base de datos y envía una respuesta con el estado 200 (OK) y el objeto del nuevo turno de trabajo creado.
    await newShift.save();
    res.status(200).json(newShift);
  } catch (error) {
    // Envía una respuesta con el estado 500 (Internal Server Error) y los detalles del error en la carga útil del objeto JSON.
    res.status(500).json({ message: error.message });
  }
};

// Controlador para editar y actualizar los detalles de un turno de trabajo existente.
export const editShifts = async (req, res) => {
  try {
    // Busca en la base de datos el turno de trabajo correspondiente y actualiza sus detalles utilizando el método `findByIdAndUpdate()`.
    const editShift = await Shift.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // Si el turno de trabajo no existe, se envía una respuesta con el estado 404 (Not Found) al cliente con un mensaje indicando que no se ha encontrado el turno de trabajo.
    if (!editShift) return res.status(404).json({ message: "Shift not found" });
    // Envía una respuesta con el estado 200 (OK) y el objeto del turno de trabajo actualizado.
    res.status(200).json(editShift);
  } catch (error) {
    // Envía una respuesta con el estado 500 (Internal Server Error) y los detalles del error en la carga útil del objeto JSON.
    res.status(500).json({ message: error.message });
  }
};

// Controlador para eliminar un turno de trabajo de la base de datos.
export const deleteShifts = async (req, res) => {
  try {
    // Busca el turno de trabajo correspondiente mediante su ID y elimina el objeto Shift de la base de datos utilizando el método `findByIdAndDelete()`.
    const deleteShift = await Shift.findByIdAndDelete(req.params.id);
    // Si el objeto eliminado no existe, envía una respuesta 404 (Not Found) al cliente con un mensaje indicando que no se ha encontrado el turno de trabajo.
    if (!deleteShift)
      return res.status(404).json({ message: "Shift not found" });
    // Envía una respuesta con el estado 200 (OK) y un mensaje de éxito indicando que el turno de trabajo ha sido eliminado.
    res.status(200).json({
      message: "Shift deleted successfully",
    });
  } catch (error) {
    // Envía una respuesta con el estado 500 (Internal Server Error) y los detalles del error en la carga útil del objeto JSON.
    res.status(500).json({ message: error.message });
  }
};
