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
    <div>
      <h1 className="text-white">Administrador de Pacientes</h1>

      <ul  className=" grid gap-4 grid-cols-2">
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
