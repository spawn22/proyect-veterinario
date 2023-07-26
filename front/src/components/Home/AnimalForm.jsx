import { useState } from "react";

const AnimalForm = () => {
  const [animal, setAnimal] = useState({
    name: "",
    owner: "",
    type: "",
    age: "",
    gender: "",
    breed: "",
    weight: "",
  });
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setAnimal({
      ...animal,
      [e.target.name]: e.target.value,
    });
  };

  const { name, owner, type, age, gender, breed, weight } = animal;

  const handleSubmit = (e) => {
    e.preventDefault();
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

    setError(false);

    //Reinciar el form
    setAnimal({
      name: "",
      owner: "",
      type: "",
      age: "",
      gender: "",
      breed: "",
      weight: "",
    });
  };
  return (
    <div className="flex justify-center items-center h-screen max-h-[55rem]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-md"
      >
        {error ? (
          <p className="w-full bg-black">Todos los campos son obligatorios</p>
        ) : null}
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Registrar Mascota
        </h2>
        <label className="text-black">
          Nombre
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre Mascota"
            onChange={handleChange}
            value={name}
          />
        </label>
        <label className="text-black">
          Nombre Dueño
          <input
            type="text"
            name="owner"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre Dueño de la Mascota"
            onChange={handleChange}
            value={owner}
          />
        </label>
        <label className="text-black">
          Tipo
          <input
            type="text"
            name="type"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tipo"
            onChange={handleChange}
            value={type}
          />
        </label>

        <label className="text-black">
          Edad
          <input
            type="number"
            name="age"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={age}
          />
        </label>
        <label className="text-black">
          Género
          <input
            type="text"
            name="gender"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={gender}
          />
        </label>
        <label className="text-black">
          Raza
          <input
            type="text"
            name="breed"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={breed}
          />
        </label>
        <label className="text-black">
          Peso
          <input
            type="text"
            name="weight"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      </form>
    </div>
  );
};
export default AnimalForm;
