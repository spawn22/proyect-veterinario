import { useEffect, useState } from "react";
import { useShiftsStore } from "../../store/shifts";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";

function Calendar() {
  const getShifts = useShiftsStore((state) => state.getShifts);
  const shifts = useShiftsStore((state) => state.shifts);
  const postShifts = useShiftsStore((state) => state.postShifts);
  const deleteShifts = useShiftsStore((state) => state.deleteShifts);
  const putShifts = useShiftsStore((state) => state.putShifts);

  const [shiftData, setShiftData] = useState({
    date: "",
    start_time: "",
    selectPatient: "",
    description: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [shiftToEdit, setShiftToEdit] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      toast.promise(
        getShifts(),
        {
          success: "Turnos cargados",
          error: "Error al cargar turnos",
        },
        {
          success: {
            duration: 3000,
          },
        }
      );
    }, 2000);
  }, [getShifts]);

  // Función para manejar el evento de agregar turno
  const handleAddShifts = (e) => {
    e.preventDefault();
    if (
      !shiftData.date ||
      !shiftData.start_time ||
      !shiftData.selectPatient ||
      !shiftData.description
    ) {
      toast.error("Por favor, llene todos los campos", { duration: 3000 });
      return;
    }
    postShifts(shiftData)
      .then(() => {
        setIsFormVisible(false);
        setShiftData({
          // date: moment(shiftData.date, "DD-MM-YYYY").format(),
          date: "",
          start_time: "",
          selectPatient: "",
          description: "",
        });
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  // Función para manejar el evento de búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleDeleteShifts = (e, id) => {
    e.preventDefault();
    deleteShifts(id);
  };

  // Función para manejar el evento de edición
  const handleEditShifts = (e) => {
    e.preventDefault();
    if (
      !shiftData.date ||
      !shiftData.start_time ||
      !shiftData.selectPatient ||
      !shiftData.description
    ) {
      toast.error("Por favor, llene todos los campos", { duration: 3000 });
      return;
    }

    putShifts(shiftToEdit._id, shiftData)
      .then(() => {
        setIsFormVisible(false);
        setShiftToEdit(null);
        setShiftData({
          date: "",
          start_time: "",
          selectPatient: "",
          description: "",
        });
      })
      .catch((error) => {
        toast.error(error);
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
      <Toaster />
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
              setShiftData({
                date: "",
                start_time: "",
                selectPatient: "",
                description: "",
              });
            }}
          >
            Agregar Turno
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light bg-blue-500">
                <thead className="h-10">
                  <tr className="bg-[#fffffe] text-bold text-base  text-[#094067]">
                    <th scope="col" className="px-6 py-4">
                      Paciente
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Dueño
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Raza
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Fecha
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Hora
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Descripcion
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Acciones
                    </th>
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
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {shift?.animal?.animalName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {shift?.animal?.animalOwner}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {shift?.animal?.animalBreed}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {moment(shift?.date).utc().format("DD/MM/YYYY")}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {shift?.start_time}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {shift?.description}
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              setIsFormVisible(true);
                              setShiftToEdit(shift);
                              setShiftData({
                                date: shift?.date,
                                start_time: shift?.start_time,
                                selectPatient: shift?.patient?._id,
                                description: shift?.description,
                              });
                            }}
                            className="mr-10"
                          >
                            <AiFillEdit
                              size={25}
                              className="hover:text-blue-500"
                            />
                          </button>
                          <button
                            onClick={(e) => handleDeleteShifts(e, shift?._id)}
                            className="mr-2"
                          >
                            <AiFillDelete
                              size={25}
                              className="hover:text-red-500"
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Formulario Flotante */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      )}
      <form
        className={`fixed bg-[#fffffe] rounded-md shadow-md p-[5%] z-20 flex flex-col justify-center items-center  ${
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
            <label
              htmlFor="description"
              className="text-black font-bold text-lg block"
            >
              Descripcion:
            </label>
            <input
              type="text"
              className="px-2 py-2 border border-gray-300 rounded-md"
              value={shiftData.description}
              onChange={(event) =>
                setShiftData({ ...shiftData, description: event.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="date"
              className="text-black font-bold text-lg block"
            >
              Fecha:
            </label>
            <input
              type="date"
              id="date"
              className="px-2 py-2 border border-gray-300 rounded-md"
              value={moment(shiftData.date).format("YYYY-MM-DD")}
              onChange={(event) =>
                setShiftData({ ...shiftData, date: event.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="time"
              className="text-black font-bold text-lg block"
            >
              Hora:
            </label>
            <input
              type="time"
              id="time"
              className="px-2 py-1 border border-gray-300 rounded-md"
              value={shiftData.start_time}
              onChange={(event) =>
                setShiftData({ ...shiftData, start_time: event.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="selectedPatient"
              className="text-black font-bold text-lg block"
            >
              Paciente:
            </label>
            <select
              id="selectedPatient"
              className="px-2 py-1 border border-gray-300 rounded-md"
              value={shiftData.selectPatient}
              onChange={(event) =>
                setShiftData({
                  ...shiftData,
                  selectPatient: event.target.value,
                })
              }
            >
              {/* Opciones para el selector de paciente */}
              {/* {shifts.map((patient) => (
        <option key={patient._id} value={patient.animal._id}>
          {patient.animal.animalName}
        </option>
      ))} */}
            </select>
          </div>
        </div>
        <div className=" flex flex-col justify-center items-center ">
          <button
            className="px-4 py-3 w-full bg-[#3da9fc] text-[#fffffe] rounded-md mt-2 mb-3 hover:bg-gray-400"
            type="submit"
          >
            {shiftToEdit ? "Guardar cambios" : "Agendar turno"}
          </button>
          <button
            className="px-4 py-3 bg-[#3da9fc] w-full text-[#fffffe] rounded-md hover:bg-gray-400"
            onClick={handleCancelEdit}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Calendar;
