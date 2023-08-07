const ButtonAnimal = ({ children }) => {
  return (
    <button
      type="submit"
      className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {children}
    </button>
  );
};
export default ButtonAnimal;
