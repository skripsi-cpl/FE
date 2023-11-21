import { NavbarComponent, FooterComponent } from "../../Components";
import "./Dashboarddepartment.css";
const DashboardDepartment = () => {
    return (
        <>
            <NavbarComponent />
            <div className="container">
                <h1>Helo, Guys! ini dashboard Department hasiswa</h1>

                <div className="content">
                    <p>ini content</p>
                </div>
            </div>
            <FooterComponent />
        </>
    );
};

export default DashboardDepartment;
