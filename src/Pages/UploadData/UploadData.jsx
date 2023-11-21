import { FooterComponent, NavbarDosenComponent } from "../../Components";
import "./uploaddata.css"

const UploadDataMhs = () => {
    return (
        <>
            <NavbarDosenComponent />
            <div className="container-upload-mhs">
                <h1>Dosen Pengampu!</h1>
                <div className="content-upload-mhs">
                    <form action="">
                        <h3 htmlFor="">Pilih Mata Kuliah</h3>
                        <select>
                            {Array.from({ length: 15 }, (_, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                </option>
                            ))}
                        </select>
                        <h3>Upload File Nilai Berbasis OBE:</h3>
                        <h4>File template : <a href="">OBE.xlsx</a></h4>
                        <div className="upload-excel-wrapper">
                            <div className="container-upload-excel">

                            </div>
                        </div>
                        <div className="button-excel-wrapper">
                            <div className="button-excel">
                                <button>Cancel</button>
                                <button>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <FooterComponent />
        </>
    );
};

export default UploadDataMhs;
