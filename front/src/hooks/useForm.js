import { useState } from "react";

const useForm = ({ initialValues }) => {
  const [fields, setFields] = useState(initialValues);

  const onChange = (event) => {
    const { value, name } = event.target;

    setFields({ ...fields, [name]: value });
  };

  return {
    fields,
    setFields,
    getInput: (name) => ({
      name,
      value: fields[name],
      onChange,
    }),
  };
};

export default useForm;
