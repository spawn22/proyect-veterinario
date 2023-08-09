import { useEffect, useState } from "react";
import { useAnimalStore } from "../store/animalStore";
import PaginationTable from "../components/PaginationTable";
import toast from "react-hot-toast";
import { Input } from "./Input";
import AnimalErrorSearch from "./AnimalErrorSearch";
import AnimalCardsList from "./AnimalCardsList";
const AnimalCards = () => {
  const { patients } = useAnimalStore((state) => ({
    patients: state.patients,
  }));
  const { getAnimals } = useAnimalStore();
  // Establece ITEMS_PER_PAGE en 4
  const ITEMS_PER_PAGE = 4;
  // Establece currentPage en 1 usando el Hook de estado 'useState()'
  const [currentPage, setCurrentPage] = useState(1);
  // Usa la función 'filterAnimals' del store 'useAnimalStore()' y establece las variables de búsqueda de animales.
  const { filterAnimals } = useAnimalStore();
  const [searchTermName, setSearchTerm] = useState("");
  const [searchTermType, setSearchTermType] = useState("");
  // Realiza un 'slice' en la matriz 'patients' y establece los pacientes del rango de ITEMS_PER_PAGE en la página actual (currentPage).
  const shiftedPatients = patients?.slice(
    currentPage > 1 ? (currentPage - 1) * ITEMS_PER_PAGE : 0,
    currentPage > 1 ? currentPage * ITEMS_PER_PAGE : ITEMS_PER_PAGE
  );
  // Calcula el número total de páginas necesarias utilizando 'Math.ceil()' de la longitud total de pacientes.
  const totalPages = Math.ceil(
    (patients?.length - ITEMS_PER_PAGE) / ITEMS_PER_PAGE + 1
  );

  // Hook 'useEffect()' con dependencias de 'currentPage' y 'shiftedPatients'
  useEffect(() => {
    // Si no hay más pacientes en la página actual.
    if (shiftedPatients.length === 0) {
      // Asigna la página actual a la página anterior.
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage, shiftedPatients]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSearchName = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSearchType = (e) => {
    setSearchTermType(e.target.value);
  };

  useEffect(() => {
    filterAnimals(searchTermName, searchTermType);
  }, [searchTermType, searchTermName, filterAnimals]);

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
      <section className="md:flex justify-evenly gap-1">
        <div className="mb-2 md:w-full">
          <Input
            type="text"
            placeholder="Nombre de mascota"
            className="px-2 py-1 border border-gray-300 rounded-md w-[100%] bg-gray-900 text-white"
            value={searchTermName}
            onInput={handleSearchName}
          />
        </div>
        <div className="md:w-full">
          <Input
            type="text"
            placeholder="Tipo de animal, Ej: Gato, Perro, etc."
            className="px-2 py-1 border border-gray-300 rounded-md w-[100%] bg-gray-900 text-white"
            value={searchTermType}
            onChange={handleSearchType}
          />
        </div>
      </section>
      {shiftedPatients.length >= 1 ? (
        <AnimalCardsList shiftedPatients={shiftedPatients} />
      ) : (
        <AnimalErrorSearch />
      )}
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
