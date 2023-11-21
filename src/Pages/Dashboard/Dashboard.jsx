import { NavbarComponent, FooterComponent } from "../../Components";
import "./Dashboard.css";
const Dashboard = () => {
  return (
    <>
      <NavbarComponent />
      <div className="container">
        <h1>Helo, Guys!</h1>

        <div className="content">
          <p>ini content</p>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default Dashboard;
