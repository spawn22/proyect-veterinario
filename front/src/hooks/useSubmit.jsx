import toast from "react-hot-toast";
import { useAnimalStore } from "../store/animalStore";
// import useErrors from "../hooks/useErrors";



const useSubmit = ({form, initialValues, setError, error}) => {
  const registerAnimal = useAnimalStore((state) => state.registerAnimal);
  
  
  
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { fields, setFields } = form;
    console.log('hola');

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
    handleSubmit,
    error
  )
}
export default useSubmit