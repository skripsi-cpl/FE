import "./NavbarComponent.css";
import SchoolIcon from '@mui/icons-material/School';
import logo from "../../assets/images/logo/logo-departemen1.png";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavbarMhsComponent = () => {
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
                        <NavLink to={"/dashboardmhs"}>Beranda</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/dashboardmhs/pencapaian"} >Lihat Pencapaian</NavLink>

                    </li>
                    <li className="dropdown" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
                        <p className="logo-operator"><SchoolIcon /> &nbsp; Mahasiswa</p>
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

export default NavbarMhsComponent;
