import { useState } from "react";


export const initialState ={
  name: "",
  owner: "",
  type: "",
  age: "",
  gender: "",
  breed: "",
  weight: "",
}

export const useAnimal = () => {
  const [animal, setAnimal] = useState(
    initialState
);
  return { animal, setAnimal };
};


