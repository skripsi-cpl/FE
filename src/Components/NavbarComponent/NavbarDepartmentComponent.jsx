import "./NavbarComponent.css";
import logo from "../../assets/images/logo/logo-departemen1.png";
import { NavLink } from "react-router-dom";
const NavbarDepartmentComponent = () => {

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    }

    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="menu">
                <ul>
                    <li>
                        <NavLink to={"/dashboarddepartment"}>Beranda</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/dashboarddepartment/permahasiswaan"} >Permahasiswaan</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={logout} >Sign out</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavbarDepartmentComponent;
