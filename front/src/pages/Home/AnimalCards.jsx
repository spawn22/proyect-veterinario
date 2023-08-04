import { useEffect, useState } from "react";
import { useAnimalStore } from "../../store/animalStore";
import AnimalCard from "./AnimalCard";
import toast from "react-hot-toast";
import PaginationTable from "../../components/PaginationTable"
const AnimalCards = () => {
  const { patients } = useAnimalStore((state) => ({
    patients: state.patients,
  }));
  const { getPatients } = useAnimalStore();
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const shiftedPatients = patients?.slice(
    currentPage > 1 ? (currentPage - 1) * ITEMS_PER_PAGE : 0,
    currentPage > 1 ? currentPage * ITEMS_PER_PAGE : ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(
    (patients?.length - ITEMS_PER_PAGE) / ITEMS_PER_PAGE + 1
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    toast.promise(
      getPatients(),
      {
        loading: "Cargando pacientes...",
        success: "Pacientes cargados",
        error: "Error al cargar pacientes",
      },
      {
        success: {
          duration: 2000,
        },
        loading: {
          duration: 1000,
        },
        error: {
          duration: 2000,
        },
      }
    );
  }, [getPatients]);

  return (
    <div className="mt-6">
      <h1 className="text-zinc-50 mb-4 font-bold text-2xl">
        Administrador tus Pacientes <span className="text-sky-300">AQUI</span>
      </h1>

      <ul className=" grid gap-4 md:grid-cols-2 mt-2">
        {shiftedPatients.map((patient) => (
          <li key={patient._id}>
            <AnimalCard patient={patient} key={patient._id} />
          </li>
        ))}
      </ul>
      {patients?.length > ITEMS_PER_PAGE && (
              <PaginationTable
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
    </div>
  );
};
export default AnimalCards;
