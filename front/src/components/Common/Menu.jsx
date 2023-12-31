import { NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { useAuthStore } from "../../store/auth";
import toast from "react-hot-toast";
const Menu = () => {
  const context = useContext(AuthContext);

  const logoutUser = useAuthStore((state) => state.logout);

  const handleClick = async () => {
    await logoutUser();
    context.setIsAuthenticated(false);
    toast.success("Logout exitoso");
  };
  return (
    <nav className="navbar bg-navigation-colors">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-navigation-colors rounded-box w-52"
          >
            <li>
              <NavLink to={"/home"}>Inicio</NavLink>
            </li>
            <li>
              <NavLink to={"/calendar"}>Calendario</NavLink>
            </li>
            <li>
              <NavLink to={"/Profile"}>Perfil</NavLink>
            </li>
          </ul>
        </div>
        <NavLink className="btn btn-ghost normal-case text-xl" to={"/home"}>
          Veterinaria
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to={"/home"}>Inicio</NavLink>
          </li>
          <li>
            <NavLink to={"/calendar"}>Calendario</NavLink>
          </li>
          <li>
            <NavLink to={"/Profile"}>Perfil</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {!context.isAuthenticated ? (
          <NavLink className="btn" to={"/login"}>
            Login
          </NavLink>
        ) : (
          <NavLink className="btn" to={"/login"} onClick={handleClick}>
            Logout
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Menu;
