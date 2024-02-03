import { NavbarDepartmentComponent, FooterComponent, TableDosen } from "../../Components";
import "./PencapaianDepartment.css"
const PencapaianDepartment = () => {
    return (
        <>
            <NavbarDepartmentComponent />
            <div className="container-dosen-data-mhs">
                <h1>Haloo Department</h1>

                <div className="content-dosen-data-mhs">
                    <form action="">
                        <h3>Pilih Semester</h3>
                        <select>
                            {Array.from({ length: 15 }, (_, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                </option>
                            ))}
                        </select>
                    </form>
                    <h3>Filters</h3>

                </div>
            </div>
            <FooterComponent />
        </>
    );
};

export default PencapaianDepartment;
