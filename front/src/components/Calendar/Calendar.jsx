import { useEffect, useState } from "react";
import { useShiftsStore } from "../../store/shifts";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

function Calendar() {
  const getShifts = useShiftsStore((state) => state.getShifts);
  const shifts = useShiftsStore((state) => state.shifts);
  const postShifts = useShiftsStore((state) => state.postShifts);
  const deleteShifts = useShiftsStore((state) => state.deleteShifts);
  const putShifts = useShiftsStore((state) => state.putShifts);

  const [date, setDate] = useState("");
  const [start_time, setStartTime] = useState("");
  const [selectPatient, setSelectedPatient] = useState("");
  const [description, setDescription] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [shiftToEdit, setShiftToEdit] = useState(null);

  useEffect(() => {
    getShifts();
  }, [getShifts]);

  // Función para manejar el evento de agregar turno
  const handleAddShifts = (e) => {
    e.preventDefault();
    const data = { date, start_time, selectPatient, description };
    postShifts(data).then(() => {
      setIsFormVisible(false);
      setDate("");
      setStartTime("");
      setSelectedPatient("");
      setDescription("");
      getShifts();
    });
  };

  // Función para manejar el evento de búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleDeleteShifts = (e, id) => {
    e.preventDefault();
    deleteShifts(id).then(() => {
      getShifts();
    });
  };

  // Función para manejar el evento de edición
  const handleEditShifts = (e) => {
    e.preventDefault();
    const newData = { date, start_time, selectPatient, description };
    putShifts(shiftToEdit._id, newData).then(() => {
      setIsFormVisible(false);
      setShiftToEdit(null);
      setDate("");
      setStartTime("");
      setSelectedPatient("");
      setDescription("");
      getShifts();
    });
  };

  // Función para manejar el evento de cancelar la edición
  const handleCancelEdit = (e) => {
    e.preventDefault();
    setIsFormVisible(false);
    setShiftToEdit(null);
  };

  return (
    <div>
      {/*Input de busqueda */}
      {/*Boton agregar Turnos */}
      <div className="my-4 flex justify-between">
        <div className=" mr-4">
          <input
            type="text"
            placeholder="Buscar nombre Paciente"
            className="px-2 py-1 border border-gray-300 rounded-md w-[100%]"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div>
          <button
            className="px-4 py-2 bg-[#3da9fc] text-[#fffffe] rounded-md"
            onClick={() => {
              setIsFormVisible(true);
              setDate("");
              setStartTime("");
              setSelectedPatient("");
              setDescription("");
            }}
          >
            Agregar Turno
          </button>
        </div>
      </div>

      <table className="w-full table-auto border border-gray-30 bg-blue-500">
        <thead className="h-10">
          <tr className="bg-[#fffffe] text-bold text-1xl text-[#094067]">
            <th>Paciente</th>
            <th>Dueño</th>
            <th>Raza</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Descripcion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {shifts
            ?.filter((shift) => {
              const searchTermLower = searchTerm.toLowerCase();
              return shift?.animal?.animalName
                ?.toLowerCase()
                ?.includes(searchTermLower);
            })
            ?.map((shift) => (
              <tr
                key={shift?._id ?? ""}
                className="border border-gray-300 bg-[#fffffe] text-[#5f6c7b] h-20 w-auto font-semibold"
              >
                <td>{shift?.animal?.animalName}</td>
                <td>{shift?.animal?.animalOwner}</td>
                <td>{shift?.animal?.animalBreed}</td>
                <td>{new Date(shift?.date).toLocaleDateString("es-AR")}</td>
                <td>{shift?.start_time}</td>
                <td>{shift?.description}</td>
                <td>
                  <button
                    onClick={() => {
                      setIsFormVisible(true);
                      setShiftToEdit(shift);
                      setDate(shift.date);
                      setStartTime(shift.start_time);
                      setSelectedPatient(shift.selectPatient);
                      setDescription(shift.description);
                    }}
                    className="mr-10"
                  >
                    <AiFillEdit size={25} />
                  </button>
                  <button
                    onClick={(e) => handleDeleteShifts(e, shift?._id)}
                    className="mr-2"
                  >
                    <AiFillDelete size={25} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Formulario Flotante */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      )}
      <form
        className={`fixed bg-[#fffffe] rounded-md shadow-md p-[5%] z-20   ${
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
        <h1 className="text-center font-bold text-3xl mb-10 text-[#094067]">
          {shiftToEdit ? "Editar turno" : "Crear turno"}
        </h1>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="text-black font-bold mr-5 text-lg"
          >
            Descripcion:
          </label>
          <input
            type="text"
            className="px-2 py-2 border border-gray-300 rounded-md"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="text-black font-bold mr-5 text-lg">
            Fecha:
          </label>
          <input
            type="date"
            id="date"
            className="px-2 py-2 border border-gray-300 rounded-md"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="text-black font-bold mr-5 text-lg">
            Hora:
          </label>
          <input
            type="time"
            id="time"
            className="px-2 py-1 border border-gray-300 rounded-md"
            value={start_time}
            onChange={(event) => setStartTime(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="selectedPatient"
            className="text-black font-bold mr-5 text-lg"
          >
            Paciente:
          </label>
          <select
            id="selectedPatient"
            className="px-2 py-1 border border-gray-300 rounded-md"
            value={selectPatient}
            onChange={(event) => setSelectedPatient(event.target.value)}
          >
            {/* Opciones para el selector de paciente */}
            {/* {shifts.map((patient) => (
      <option key={patient._id} value={patient.animal._id}>
        {patient.animal.animalName}
      </option>
    ))} */}
          </select>
        </div>
        <div className="mt-10">
          <button
            className="px-4 py-2 bg-[#3da9fc] text-[#fffffe] rounded-md mr-5"
            onClick={handleCancelEdit}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-[#3da9fc] text-[#fffffe] rounded-md ml-5"
            type="submit"
          >
            {shiftToEdit ? "Guardar cambios" : "Agendar turno"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Calendar;
