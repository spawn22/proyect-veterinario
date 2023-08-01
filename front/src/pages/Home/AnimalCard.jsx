import { useAnimalStore } from "../../store/animalStore";

const AnimalCard = ({patient}) => {
  const {_id, name, owner, type, age, gender, breed, weight } = patient;
const {deleteAnimal }=useAnimalStore()
 

  return (
    <div className="bg-zinc-500 p-2 rounded-xl">
    <p>
      Mascota: <span>{name}</span>
    </p>
    <p>
      Propietario: <span>{owner}</span>
    </p>
    <p>
      Tipo: <span>{type}</span>
    </p>
    <p>
      Edad: <span>{age}</span>
    </p>
    <p>
      Género: <span>{gender}</span>
    </p>
    <p>
      Raza: <span>{breed}</span>
    </p>
    <p>
      Peso: <span>{weight}</span>
    </p>
    <button
      className="bg-red-600 text-zinc-50 py-1 px-2 rounded-[5px] "
      onClick={() => deleteAnimal(_id)}
    >
      Eliminar &times;
    </button>
  </div>
  )
}
export default AnimalCard