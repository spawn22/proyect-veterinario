import { useEffect, useState } from "react";
import { useShiftsStore } from "../../store/shifts";
import { useAnimalStore } from "../../store/animalStore";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import ShiftForm from "../../components/ShiftForm";
import ShiftTable from "../../components/ShiftTable";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

function Calendar() {
  const getShifts = useShiftsStore((state) => state.getShifts);
  const shifts = useShiftsStore((state) => state.shifts);
  const getAnimals = useAnimalStore((state) => state.getAnimals);
  const animals = useAnimalStore((state) => state.patients);
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
    toast.promise(
      getShifts(toast),
      {
        loading: "Cargando turnos...",
        success: "Turnos cargados",
        error: "Error al cargar turnos",
      },
      {
        success: {
          duration: 2000,
        },
      }
    );
    getAnimals();
  }, [getShifts, getAnimals]);

  // Función para manejar el evento de agregar turno
  const handleAddShifts = (e) => {
    e.preventDefault();
    if (
      !shiftData.date ||
      !shiftData.start_time ||
      !shiftData.selectPatient ||
      !shiftData.description
    ) {
      toast.error("Por favor, llene todos los campos", { duration: 2000 });
      return;
    }
    const data = {
      description: shiftData.description,
      date: shiftData.date,
      start_time: shiftData.start_time,
      animal: shiftData.selectPatient,
    };
    postShifts(data, toast)
      .then(() => {
        setIsFormVisible(false);
        setShiftData({
          date: "",
          start_time: "",
          selectPatient: "",
          description: "",
        });
        toast.success("Turno agregado correctamente", { duration: 2000 });
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
    Swal.fire({
      title: "Desea Eliminar este Turno?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirma!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteShifts(id, toast);
        Swal.fire("Eliminada!", "La mascota fue eliminada.", "success");
      }
    });
  };

  // Función para manejar el evento de edición
  const handleEditShifts = (e) => {
    e.preventDefault();
    if (!shiftData.date || !shiftData.start_time || !shiftData.description) {
      toast.error("Por favor, llene todos los campos", { duration: 2000 });
      return;
    }
    putShifts(
      shiftToEdit._id,
      {
        ...shiftData,
        animal: shiftData.selectPatient,
      },
      toast
    )
      .then(() => {
        setIsFormVisible(false);
        setShiftToEdit(null);
        setShiftData({
          date: "",
          start_time: "",
          selectPatient: "",
          description: "",
        });
        toast.success("Turno editado correctamente", { duration: 2000 });
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
      {/*Input de busqueda */}
      {/*Boton agregar Turnos */}
      <div className="my-4 flex justify-between">
        <div className=" mr-4">
          <Input
            type="text"
            placeholder="Buscar nombre Paciente"
            className="px-2 py-1 border border-gray-300 rounded-md w-[100%] bg-gray-900 text-white"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div>
          <Button
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
          </Button>
        </div>
      </div>
      {/* Tabla Turnos */}
      <ShiftTable
        shifts={shifts}
        searchTerm={searchTerm}
        handleDeleteShifts={handleDeleteShifts}
        setIsFormVisible={setIsFormVisible}
        setShiftToEdit={setShiftToEdit}
        setShiftData={setShiftData}
      />

      {/* Formulario Flotante */}
      <ShiftForm
        isFormVisible={isFormVisible}
        setIsFormVisible={setIsFormVisible}
        shiftToEdit={shiftToEdit}
        setShiftToEdit={setShiftToEdit}
        shiftData={shiftData}
        setShiftData={setShiftData}
        animals={animals}
        handleAddShifts={handleAddShifts}
        handleEditShifts={handleEditShifts}
        handleCancelEdit={handleCancelEdit}
      />
    </div>
  );
}

export default Calendar;
