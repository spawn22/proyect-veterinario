import Label from "./Label";
import Button from "./Button";
import { Input } from "./Input";
import { useEffect } from "react";
function ShiftForm({
  isFormVisible,
  shiftToEdit,
  shiftData,
  setShiftData,
  animals,
  handleAddShifts,
  handleEditShifts,
  handleCancelEdit,
}) {
  useEffect(() => {
    // Si hay una cita por editar, se establece su información en el formulario
    if (shiftToEdit) {
      setShiftData({
        ...shiftData,
        description: shiftToEdit.description,
        date: new Date(shiftToEdit.date).toISOString().slice(0, 10), // se convierte a ISO y se extrae solo la fecha (formato yyyy-MM-dd)
        start_time: shiftToEdit.start_time,
      });
    }
  }, [shiftToEdit]);

  return (
    <div>
      {isFormVisible && (
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      )}
      <form
        className={`fixed bg-white rounded-md shadow-md p-[5%] z-20 flex flex-col justify-center items-center text-white  ${
          isFormVisible ? "block" : "hidden"
        }`}
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "90%",
          maxHeight: "90%",
          overflow: "auto",
        }}
        onSubmit={shiftToEdit ? handleEditShifts : handleAddShifts}
      >
        <h1 className="text-center font-bold text-4xl mb-10 text-[#094067] font-serif-">
          {shiftToEdit ? "Editar turno" : "Crear turno"}
        </h1>
        <div className="mb-4 flex flex-col">
          <div className="mb-2">
            <Label
              htmlFor="description"
              className="text-black font-bold text-lg block"
            >
              Descripcion:
            </Label>
            <Input
              type="text"
              className="px-2 py-2 border border-gray-300 bg-gray-900 rounded-md"
              value={shiftData.description}
              onChange={(event) =>
                setShiftData({ ...shiftData, description: event.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <Label
              htmlFor="date"
              className="text-black font-bold text-lg block"
            >
              Fecha:
            </Label>
            <Input
              type="date"
              id="date"
              className="px-2 py-2 border border-gray-300 rounded-md bg-gray-900"
              value={shiftData.date}
              onChange={(event) =>
                setShiftData({ ...shiftData, date: event.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <Label
              htmlFor="time"
              className="text-black font-bold text-lg block "
            >
              Hora:
            </Label>
            <Input
              type="time"
              id="time"
              className="px-2 py-1 border border-gray-300 rounded-md bg-gray-900"
              value={shiftData.start_time}
              onChange={(event) =>
                setShiftData({ ...shiftData, start_time: event.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <Label
              htmlFor="selectedPatient"
              className="text-black font-bold text-lg block"
            >
              Paciente:
            </Label>
            <select
              id="selectedPatient"
              className="px-2 py-1 border border-gray-300 rounded-md bg-gray-900"
              value={shiftData.selectPatient}
              onChange={(event) =>
                setShiftData({
                  ...shiftData,
                  selectPatient: event.target.value,
                })
              }
            >
              {/* Opciones para el selector de paciente */}
              <option value="">Seleccionar Paciente</option>
              {animals.map((patient) => (
                <option key={patient._id} value={patient._id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center ">
          <Button
            className="px-4 py-3 w-full bg-blue-500 text-white rounded-md mt-2 mb-3 hover:bg-gray-400"
            type="submit"
          >
            {shiftToEdit ? "Guardar cambios" : "Agendar turno"}
          </Button>

          {shiftToEdit ? (
            <Button
              className="px-4 py-3 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={handleCancelEdit}
            >
              Cancelar edición
            </Button>
          ) : (
            <Button
              className="px-4 py-3 bg-[#3da9fc] w-full text-[#fffffe] rounded-md hover:bg-gray-400"
              onClick={handleCancelEdit}
            >
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ShiftForm;
