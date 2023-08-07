import useErrors from "../hooks/useErrors";
import { useAnimalStore } from "../store/animalStore";
import toast from "react-hot-toast";
import LabelAnimal from "./LabelAnimal";
import ButtonAnimal from "./ButtonAnimal";
import useForm from "../hooks/useForm";
import InputAnimal from "./InputAnimal";

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
        <LabelAnimal>
          Nombre
          <InputAnimal type="text" {...form.getInput("name")} />
        </LabelAnimal>
        <LabelAnimal>
          Nombre Dueño
          <InputAnimal type="text" {...form.getInput("owner")} />
        </LabelAnimal>
        <LabelAnimal>
          Tipo
          <InputAnimal type="text" {...form.getInput("type")} />
        </LabelAnimal>

        <LabelAnimal>
          Edad
          <InputAnimal type="number" {...form.getInput("age")} />
        </LabelAnimal>
        <LabelAnimal>
          Género
          <InputAnimal type="text" {...form.getInput("gender")} />
        </LabelAnimal>
        <LabelAnimal>
          Raza
          <InputAnimal type="text" {...form.getInput("breed")} />
        </LabelAnimal>
        <LabelAnimal>
          Peso
          <InputAnimal type="number" {...form.getInput("weight")} />
        </LabelAnimal>

        <ButtonAnimal>Agregar Paciente</ButtonAnimal>
      </form>
    </div>
  );
};
export default AnimalForm;
