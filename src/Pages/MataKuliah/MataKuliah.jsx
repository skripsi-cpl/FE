import { NavbarComponent, FooterComponent } from "../../Components";
import 'react-toastify/dist/ReactToastify.css';
import "./matakuliah.css";

const MataKuliah = () => {
    return (
        <>
            <NavbarComponent />
            <div className="container">

                <div className="content">
                    <p>This is content</p>
                </div>
            </div>
            <FooterComponent />
        </>
    );
};

export default MataKuliah;
