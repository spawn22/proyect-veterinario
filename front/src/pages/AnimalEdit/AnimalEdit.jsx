import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useErrors from "../../hooks/useErrors";
import { getAnimalById, useAnimalStore } from "../../store/animalStore";
import { useRef } from "react";
import toast from "react-hot-toast";

const AnimalEdit = () => {
  const navigate = useNavigate();
  const [cancelEdit, setcancelEdit] = useState(false);

  const name = useRef("");
  const owner = useRef("");
  const type = useRef("");
  const age = useRef("");
  const gender = useRef("");
  const breed = useRef("");
  const weight = useRef("");

  const { id } = useParams();

  const { error, setError } = useErrors();

  const animalToEdit = useAnimalStore(getAnimalById(id));
  const putAnimal = useAnimalStore((state) => state.putAnimal);

  useEffect(() => {
    if (animalToEdit) {
      name.current.value = animalToEdit.name;
      owner.current.value = animalToEdit.owner;
      type.current.value = animalToEdit.type;
      age.current.value = animalToEdit.age;
      gender.current.value = animalToEdit.gender;
      breed.current.value = animalToEdit.breed;
      weight.current.value = animalToEdit.weight;
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (cancelEdit) {
      navigate("/home");
      return;
    }
    if (
      !name.current.value.trim() ||
      !owner.current.value.trim() ||
      !type.current.value.trim() ||
      !age.current.value.trim() ||
      !gender.current.value.trim() ||
      !breed.current.value.trim() ||
      !weight.current.value.trim()
    ) {
      setError(true);
      return;
    }

    let data = {
      name: name.current.value,
      owner: owner.current.value,
      type: type.current.value,
      age: Number(age.current.value),
      gender: gender.current.value,
      breed: breed.current.value,
      weight: Number(weight.current.value),
      id,
    };
    await putAnimal(data);
    toast.success("Animal modificado con éxito");
    setError(false);
    navigate("/home");
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-zinc-50 mb-4 font-bold text-2xl flex gap-2 mt-5">
        Editar Pacientes{" "}
        <span className="text-sky-300 ">Desde este Formulario</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-6 max-w-md px-8 py-6 bg-zinc-50 rounded-lg shadow-md"
      >
        {error ? (
          <p className="w-full bg-black">Todos los campos son obligatorios</p>
        ) : null}
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Editar Paciente
        </h2>
        <label className="text-black block w-full text-left mb-2">
          Nombre
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
            placeholder="Nombre Mascota"
            ref={name}
          />
        </label>
        <label className="text-black block w-full text-left mb-2">
          Nombre Dueño
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
            placeholder="Nombre Dueño de la Mascota"
            ref={owner}
          />
        </label>
        <label className="text-black block w-full text-left mb-2">
          Tipo
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
            placeholder="Tipo"
            ref={type}
          />
        </label>

        <label className="text-black block w-full text-left mb-2">
          Edad
          <input
            type="number"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
            ref={age}
          />
        </label>
        <label className="text-black block w-full text-left mb-2">
          Género
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
            placeholder="macho - hembra"
            ref={gender}
          />
        </label>
        <label className="text-black block w-full text-left mb-2">
          Raza
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
            placeholder="labrador"
            ref={breed}
          />
        </label>
        <label className="text-black block w-full text-left mb-2">
          Peso
          <input
            type="number"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
            ref={weight}
          />
        </label>

        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
        >
          Guardar
        </button>
        <button
          type="submit"
          className="px-4 py-3 bg-[#3da9fc] w-full text-[#fffffe] rounded-md hover:bg-gray-400"
          onClick={() => setcancelEdit(true)}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};
export default AnimalEdit;
