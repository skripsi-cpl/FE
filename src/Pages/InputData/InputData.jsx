import { NavbarComponent, FooterComponent, ModalInputPL, ModalInputCPL, ModalInputCPMK, ModalMataKuliah, ModalInputTahunAjaran, BreadCrumbComponents, BackButton } from "../../Components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./inputdata.css";

const InputData = () => {

  return (
    <>
      <NavbarComponent />
      <div className="container-input-data">
        <div className="header-inputdata">
          <BackButton />
          <BreadCrumbComponents />
        </div>
        <br />

        <div className="content-input-data">
          <h2>Pengaturan Master Data Pembelajaran</h2>
          <hr style={
            {
              marginTop: '-20px',
            }

          } />
          <div className="input-data">
            <h3> Input Master Data Profil Lulusan</h3>
            <div className="button-input">
              <ModalInputPL />
            </div>
          </div>
          <div className="input-data">
            <h3>Input Master Data Capaian Pembelajaran Lulusan (CPL)</h3>
            <div className="button-input">
              <ModalInputCPL />
            </div>
          </div>
          <div className="input-data">
            <h3>Input Master Capaian Pembelajaran Mata Kuliah (CPMK)
            </h3>
            <div className="button-input">
              <ModalInputCPMK />
            </div>
          </div>
          <div className="input-data">
            <h3> Input Master Data Mata Kuliah
            </h3>
            <div className="button-input">
              <ModalMataKuliah />
            </div>
          </div>
          <div className="input-data">
            <h3> Input Master Data Tahun Ajaran
            </h3>
            <div className="button-input">
              <ModalInputTahunAjaran />
            </div>
          </div>
        </div>
      </div >
      <ToastContainer />
      <FooterComponent />
    </>
  );
};

export default InputData;
