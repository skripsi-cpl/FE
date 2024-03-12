import "./NavbarComponent.css";
import logo from "../../assets/images/logo/logo-departemen1.png";
import ApartmentIcon from '@mui/icons-material/Apartment';
import { NavLink } from "react-router-dom";
import { useState } from "react";
const NavbarDepartmentComponent = () => {
    const [showDropdown, setShowDropdown] = useState(false);

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
                        <NavLink to={"/dashboard-departemen"}>Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/dashboard-departemen/permahasiswaan"} >Permahasiswaan</NavLink>
                    </li>
                    <li className="dropdown" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
                        <p className="logo-operator"><ApartmentIcon /> &nbsp; Departemen</p>
                        {showDropdown && (
                            <ul className="dropdown-menu">
                                <li className="dropdown-item" onClick={logout} >Sign Out</li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavbarDepartmentComponent;
