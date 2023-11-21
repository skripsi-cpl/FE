import { NavbarMhsComponent, FooterComponent } from "../../Components";
import "./Dashboardmhs.css";
export const loggedInNama = localStorage.getItem('loggedInNama'); 
export const loggedInNIM = localStorage.getItem('loggedInNIM'); 
// Ambil email dari localStorage
const DashboardMhs = () => {
    return (
        <>
            <NavbarMhsComponent />
            <div className="container">
                <h1>Helo {loggedInNama}</h1>
                <h1>Helo {loggedInNIM}</h1>
                <div className="content">
                    <p>ini content</p>
                </div>
            </div>
            <FooterComponent />
        </>
    );
};

export default DashboardMhs;
