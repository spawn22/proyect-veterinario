import { useEffect } from "react";
import { useAnimalStore } from "../store/animalStore";
import AnimalCard from "./AnimalCard";
const AnimalCards = () => {
  const { patients } = useAnimalStore((state) => ({
    patients: state.patients,
  }));
  const { getAnimals } = useAnimalStore();

  useEffect(() => {
    getAnimals();
  }, [getAnimals]);

  return (
    <div className="mt-6">
      <h1 className="text-zinc-50 mb-4 font-bold text-2xl">
        Administrador tus Pacientes <span className="text-sky-300">AQUI</span>
      </h1>

      <ul className=" grid gap-6 md:grid md:grid-cols-1 lg:grid-cols-1 lg:gap-4 xl:grid xl:grid-cols-2 2xl:grid 2xl:grid-col-3 mt-2">
        {patients.map((patient) => (
          <li key={patient.id}>
            <AnimalCard patient={patient} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AnimalCards;
