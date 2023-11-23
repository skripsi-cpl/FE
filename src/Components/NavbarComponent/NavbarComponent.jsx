import "./NavbarComponent.css";
import logo from "../../assets/images/logo/logo-departemen1.png";
import { NavLink } from "react-router-dom";
const NavbarComponent = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="menu">
        <ul>
          <li>
            <NavLink to={"/dashboard"}>Beranda</NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/inputdata"} >Input Data</NavLink>
          </li>
          <li>
            <NavLink to={"/"} >Sign out</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarComponent;
