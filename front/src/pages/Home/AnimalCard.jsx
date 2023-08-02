import { useAnimalStore } from "../../store/animalStore";

const AnimalCard = ({ patient }) => {
  const { _id, name, owner, type, age, gender, breed, weight } = patient;
  const { deleteAnimal } = useAnimalStore();

  return (
    <div className="bg-[#fffffe] p-2 rounded-xl text-black">
      <p>
        <span className="font-bold">Mascota:</span> <span>{name}</span>
      </p>
      <p>
        <span className="font-bold">Propietario:</span> <span>{owner}</span>
      </p>
      <p>
        <span className="font-bold">Tipo:</span> <span>{type}</span>
      </p>
      <p>
        <span className="font-bold">Edad:</span> <span>{age} años</span>
      </p>
      <p>
        <span className="font-bold">Género:</span> <span>{gender}</span>
      </p>
      <p>
        <span className="font-bold">Raza:</span> <span>{breed}</span>
      </p>
      <p>
        <span className="font-bold">Peso:</span> <span>{weight} kg</span>
      </p>
      <button
        className="bg-red-600 text-white py-1 px-2 rounded-[5px] "
        onClick={() => deleteAnimal(_id)}
      >
        Eliminar &times;
      </button>
    </div>
  );
};
export default AnimalCard;
