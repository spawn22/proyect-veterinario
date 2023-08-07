import { useEffect, useState } from "react";
import { useAnimalStore } from "../store/animalStore";
import PaginationTable from "../components/PaginationTable";
import AnimalCard from "./AnimalCard";
import toast from "react-hot-toast";
const AnimalCards = () => {
  const { patients } = useAnimalStore((state) => ({
    patients: state.patients,
  }));
  const { getAnimals } = useAnimalStore();
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
      getAnimals(),
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
  }, [getAnimals]);

  return (
    <div className="mt-6">
      <h1 className="text-zinc-50 mb-4 font-bold text-2xl">
        Administrador tus Pacientes <span className="text-sky-300">AQUI</span>
      </h1>

      <ul className=" grid gap-6 md:grid md:grid-cols-1 lg:grid-cols-1 lg:gap-4 xl:grid xl:grid-cols-2 2xl:grid 2xl:grid-col-3 mt-2">
        {shiftedPatients.map((patient) => (
          <li key={patient.id}>
            <AnimalCard patient={patient} />
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