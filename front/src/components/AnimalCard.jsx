import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAnimalStore } from "../store/animalStore";

const AnimalCard = ({ patient }) => {
  const { _id, name, owner, type, age, gender, breed, weight, description } =
    patient;
  const { deleteAnimal } = useAnimalStore();
  const navigate = useNavigate();

  const confirmDelete = () => {
    Swal.fire({
      title: "Desea Eliminar esta mascota?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirma!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAnimal(_id);
        Swal.fire("Eliminada!", "La mascota fue eliminada.", "success");
      }
    });
  };

  return (
    <div className="bg-[#fffffe] p-2 rounded-xl text-black ">
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
      <p>
        <span className="font-bold">Historia Clinica:</span>{" "}
        <span>{description}</span>
      </p>

      <button
        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none mr-3"
        onClick={() => navigate(`/edit/${_id}`)}
      >
        <span className="mr-2">Editar</span>
        <AiFillEdit size={25} />
      </button>
      <button
        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none "
        onClick={confirmDelete}
      >
        <span className="mr-2">Eliminar</span>
        <AiFillDelete size={25} />
      </button>
    </div>
  );
};
export default AnimalCard;
