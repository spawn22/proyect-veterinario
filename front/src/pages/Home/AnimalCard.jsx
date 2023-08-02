import { useAnimalStore } from "../../store/animalStore";
import { FaTrashCan } from "react-icons/fa6";

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
        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none"
        onClick={() => deleteAnimal(_id)}
      >
        <span className="mr-2">Eliminar</span>
        <FaTrashCan />
        
        
        
      </button>
    </div>
  );
};
export default AnimalCard;
