import { NavbarMhsComponent, FooterComponent } from "../../Components";
import "./Dashboardmhs.css";
const DashboardMhs = () => {
    return (
        <>
            <NavbarMhsComponent />
            <div className="container">
                <h1>Helo, Guys! ini dashboard mahasiswa</h1>

                <div className="content">
                    <p>ini content</p>
                </div>
            </div>
            <FooterComponent />
        </>
    );
};

export default DashboardMhs;
