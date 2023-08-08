import { NavLink } from "react-router-dom";
import error404 from "../../Assets/404-veterinaria.png";
const Error404 = () => {
  return (
    <section className="mt-52 md:w-2/4 md:mt-0 md:flex flex-col justify-center my-0 mx-auto">
      <div className="">
        <img src={error404} className="w-full"></img>
        <NavLink
          to={"/home"}
          className="text-white text-center flex justify-center w-full px-4 py-2 mt-4  bg-sky-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Volver
        </NavLink>
      </div>
    </section>
  );
};

export default Error404;
