
const InputAnimal = ({...name}) => {
  return (
    <input
      {...name}
      className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mt-1"
    />
  );
};
export default InputAnimal;
