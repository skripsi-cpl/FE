import "./NavbarComponent.css";
import logo from "../../assets/images/logo/logo-departemen1.png";
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { useState } from "react";
import { NavLink } from "react-router-dom";
const NavbarComponent = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownOperator, setShowDropdownOperator] = useState(false);

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
            <NavLink to={"/dashboard"}>Dashboard</NavLink>
          </li>
          <li className="dropdown" onMouseEnter={() => setShowDropdownOperator(true)} onMouseLeave={() => setShowDropdownOperator(false)}>
            <p className="logo-operator"> Master Data</p>
            {showDropdownOperator && (
              <ul className="dropdown-menu">
                <li className="dropdown-item">
                  <NavLink to={"/dashboard/input-data"} >Input Data</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink to={"/dashboard/master-data"} >Master Data</NavLink>
                </li>
              </ul>
            )}
          </li>
          <li className="dropdown" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
            <p className="logo-operator"><CoPresentIcon /> &nbsp; Operator</p>
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

export default NavbarComponent;
