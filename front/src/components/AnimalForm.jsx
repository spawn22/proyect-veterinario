import useErrors from "../hooks/useErrors";
import { useAnimalStore } from "../store/animalStore";
import toast from "react-hot-toast";
import useForm from "../hooks/useForm";
import { Input } from "./Input";
import Label from "./Label";
import Button from "./Button";

const initialValues = {
  name: "",
  owner: "",
  type: "",
  age: "",
  gender: "",
  breed: "",
  weight: "",
};

const AnimalForm = () => {
  const form = useForm({ initialValues });

  const { error, setError } = useErrors();

  const registerAnimal = useAnimalStore((state) => state.registerAnimal);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { fields, setFields } = form;
    //Valida que estén llenos todos los inputs
    if (
      !fields.name.trim() ||
      !fields.owner.trim() ||
      !fields.type.trim() ||
      !fields.age.trim() ||
      !fields.gender.trim() ||
      !fields.breed.trim() ||
      !fields.weight.trim()
    ) {
      setError(true);
      return;
    }
    const data = {
      name: fields.name,
      owner: fields.owner,
      type: fields.type,
      age: Number(fields.age),
      gender: fields.gender,
      breed: fields.breed,
      weight: Number(fields.weight),
    };

    await registerAnimal(data);
    toast.success("Animal registrado con éxito");
    setError(false);

    // Reinciar el form
    setFields(initialValues);
  };
  return (
    <div>
      <h1 className="text-zinc-50 mb-4 font-bold text-2xl flex gap-2 mt-5 ">
        Crea tus Pacientes{" "}
        <span className="text-sky-300 ">Desde este Formulario</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-6 w-md md:w-full xl:max-w-md px-8 py-6 bg-zinc-50 rounded-lg shadow-md"
      >
        {error ? (
          <p className="w-full bg-black">Todos los campos son obligatorios</p>
        ) : null}
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Registrar Paciente
        </h2>
        <Label className="text-black block w-full text-left mb-2">
          Nombre
          <Input
            type="text"
            placeholder="Nombre"
            {...form.getInput("name")}
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
          />
        </Label>
        <Label className="text-black block w-full text-left mb-2">
          Nombre Dueño
          <Input
            type="text"
            placeholder="Nombre del Dueño"
            {...form.getInput("owner")}
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
          />
        </Label>
        <Label className="text-black block w-full text-left mb-2">
          Tipo
          <Input
            type="text"
            placeholder="Tipo de Mascota"
            {...form.getInput("type")}
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
          />
        </Label>

        <Label className="text-black block w-full text-left mb-2">
          Edad
          <Input
            type="number"
            placeholder="Edad de la Mascota"
            {...form.getInput("age")}
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
          />
        </Label>
        <Label className="text-black block w-full text-left mb-2">
          Género
          <Input
            type="text"
            placeholder="Género de la Mascota"
            {...form.getInput("gender")}
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
          />
        </Label>
        <Label className="text-black block w-full text-left mb-2">
          Raza
          <Input
            type="text"
            placeholder="Raza de la Mascota"
            {...form.getInput("breed")}
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
          />
        </Label>
        <Label className="text-black block w-full text-left mb-2">
          Peso
          <Input
            placeholder="Peso de la Mascota"
            min="0"
            step="0.01"
            max="1000"
            pattern="[0-9]*(\.[0-9]{1,2})?"
            title="Solo se permiten nÚmeros y decimales"
            type="number"
            {...form.getInput("weight")}
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
          />
        </Label>

        <Button
          type="submit"
          className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Agregar Paciente
        </Button>
      </form>
    </div>
  );
};
export default AnimalForm;
