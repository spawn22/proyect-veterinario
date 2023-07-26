import { Form } from "react-router-dom";
import useErrors from "../../hooks/useErrors";
import { useAnimal, initialState } from "../../hooks/useAnimal";
import { useAnimalStore } from "../../store/animalStore";

const AnimalForm = () => {
  const { animal, setAnimal } = useAnimal();
  const { name, owner, type, age, gender, breed, weight } = animal;
  const { error, setError } = useErrors();

  const registerAnimal = useAnimalStore((state) => state.registerAnimal);

  const handleChange = (event) => {
    setAnimal({
      ...animal,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //Validar
    if (
      !name.trim() ||
      !owner.trim() ||
      !type.trim() ||
      !age.trim() ||
      !gender.trim() ||
      !breed.trim() ||
      !weight.trim()
    ) {
      setError(true);
      return;
    }

    const data = { name, owner, type, age, gender, breed, weight };
    console.log(data);
    await registerAnimal(data)

    setError(false);

    //Reinciar el form
    setAnimal(initialState);
  };
  return (
    <div className="flex justify-center items-center h-screen max-h-[55rem]">
      <Form
        onSubmit={handleSubmit}
        className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-md"
      >
        {error ? (
          <p className="w-full bg-black">Todos los campos son obligatorios</p>
        ) : null}
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Registrar Paciente
        </h2>
        <label className="text-black block w-full text-left mb-2">
          Nombre
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
            placeholder="Nombre Mascota"
            onChange={handleChange}
            value={name}
          />
        </label>
        <label className="text-black block w-full text-left mb-2">
          Nombre Dueño
          <input
            type="text"
            name="owner"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
            placeholder="Nombre Dueño de la Mascota"
            onChange={handleChange}
            value={owner}
          />
        </label>
        <label className="text-black block w-full text-left mb-2">
          Tipo
          <input
            type="text"
            name="type"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
            placeholder="Tipo"
            onChange={handleChange}
            value={type}
          />
        </label>

        <label className="text-black block w-full text-left mb-2">
          Edad
          <input
            type="number"
            name="age"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
            onChange={handleChange}
            value={age}
          />
        </label>
        <label className="text-black block w-full text-left mb-2">
          Género
          <input
            type="text"
            name="gender"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
            onChange={handleChange}
            placeholder="macho - hembra"
            value={gender}
          />
        </label>
        <label className="text-black block w-full text-left mb-2">
          Raza
          <input
            type="text"
            name="breed"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
            onChange={handleChange}
            placeholder="labrador"
            value={breed}
          />
        </label>
        <label className="text-black block w-full text-left mb-2">
          Peso
          <input
            type="number"
            name="weight"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
            onChange={handleChange}
            value={weight}
          />
        </label>

        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Agregar Paciente
        </button>
      </Form>
    </div>
  );
};
export default AnimalForm;
