import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useErrors from "../../hooks/useErrors";
import { getAnimalById, useAnimalStore } from "../../store/animalStore";
import { useRef } from "react";
import toast from "react-hot-toast";
import Label from "../../components/Label";
import { Input } from "../../components/Input";
import Button from "../../components/Button";
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
  const description = useRef("");

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
      description.current.value = animalToEdit.description;
    }
  }, [animalToEdit]);

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
      !weight.current.value.trim() ||
      !description.current.value.trim()
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
      description: description.current.value,
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
        <Label className="text-black block w-full text-left mb-2">
          Nombre
          <Input
            type="text"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
            placeholder="Nombre Mascota"
            ref={name}
          />
        </Label>
        <Label className="text-black block w-full text-left mb-2">
          Nombre Dueño
          <Input
            type="text"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
            placeholder="Nombre Dueño de la Mascota"
            ref={owner}
          />
        </Label>
        <Label className="text-black block w-full text-left mb-2">
          Tipo
          <Input
            type="text"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
            placeholder="Tipo"
            ref={type}
          />
        </Label>

        <Label className="text-black block w-full text-left mb-2">
          Edad
          <Input
            type="number"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
            ref={age}
          />
        </Label>
        <Label className="text-black block w-full text-left mb-2">
          Género
          <Input
            type="text"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
            placeholder="macho - hembra"
            ref={gender}
          />
        </Label>
        <Label className="text-black block w-full text-left mb-2">
          Raza
          <Input
            type="text"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
            placeholder="labrador"
            ref={breed}
          />
        </Label>
        <Label className="text-black block w-full text-left mb-2">
          Peso
          <Input
            type="number"
            min="0"
            step="0.01"
            max="1000"
            pattern="[0-9]*(\.[0-9]{1,2})?"
            title="Solo se permiten nÚmeros y decimales"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
            ref={weight}
          />
        </Label>
        <Label className="text-black block w-full text-left mb-2">
          Historial Clinico
          <Input
            type="text"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
            ref={description}
          />
        </Label>

        <Button
          type="submit"
          className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
        >
          Guardar
        </Button>
        <Button
          type="submit"
          className="px-4 py-3 bg-[#3da9fc] w-full text-[#fffffe] rounded-md hover:bg-gray-400"
          onClick={() => setcancelEdit(true)}
        >
          Cancelar
        </Button>
      </form>
    </div>
  );
};
export default AnimalEdit;
