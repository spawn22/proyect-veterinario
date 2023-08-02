import { NavLink } from "react-router-dom";
import error404 from "../../Assets/404-veterinaria.png"
const Error404 = () => {
    return (
        <section className="mt-52 md:w-2/4 md:mt-0 md:flex flex-col justify-center my-0 mx-auto">
            <div className="">
             <img src={error404} className="w-full"></img>
            <NavLink to={"/home"}>Volver</NavLink>
            </div>
        </section>
    );
};

export default Error404;