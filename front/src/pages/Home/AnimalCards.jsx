import { useEffect } from "react";
import { useAnimalStore } from "../../store/animalStore";
import AnimalCard from "./AnimalCard";

const AnimalCards = () => {
  const { patients } = useAnimalStore((state) => ({
    patients: state.patients,
  }));
  const { getPatients } = useAnimalStore();

  useEffect(() => {
    getPatients();
  }, [getPatients]);

  return (
    <div className="mt-6">
      <h1 className="text-zinc-50 mb-4 font-bold text-2xl">Administrador tus Pacientes <span className="text-sky-300">AQUI</span></h1>

      <ul  className=" grid gap-4 md:grid-cols-2 mt-2">
      {patients.map((patient) => (
          <li key={patient._id}>
            <AnimalCard patient={patient} key={patient._id} />
          </li>
      ))}
      </ul>
    </div>
  );
};
export default AnimalCards;
