import { NavbarComponent, FooterComponent, ModalInputPL, ModalInputCPL, ModalInputCPMK } from "../../Components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import "./inputdata.css";

const InputData = () => {
  return (
    <>
      <NavbarComponent />
      <div className="container-input-data">
        <h1>Pengaturan Master Data Pembelajaran</h1>
        <div className="content-input-data">
          <div className="card-data">
            <h2>Profil Lulusan (PL)</h2>
            <br />
            <br />
            <div className="card-data-desc">
              <p>
                Profil Lulusan adalah kumpulan capaian pembelajaran yang harus
                dimiliki oleh lulusan program studi yang bersangkutan. Profil
                lulusan merupakan hasil dari proses penyusunan kurikulum program
                studi yang mengacu pada Standar Nasional Pendidikan Tinggi.
              </p>
              <br />
            </div>
            <div className="card-data-button">
              <ModalInputPL />
            </div>
          </div>
          <div className="card-data">
            <h2>Capain Pembelajaran Lulusan (CPL)</h2>
            <div className="card-data-desc">
              <p>
                Capaian Pembelajaran Lulusan adalah kemampuan yang harus dimiliki
                oleh lulusan program studi yang bersangkutan. Capaian pembelajaran
                lulusan merupakan hasil dari proses penyusunan kurikulum program
                studi yang mengacu pada Standar Nasional Pendidikan Tinggi.
              </p>
            </div>
            <div className="card-data-button">
              <ModalInputCPL />
            </div>
          </div>
          <div className="card-data">
            <h2>Capain Pembelajaran Mata Kuliah (CPMK)</h2>
            <div className="card-data-desc">
              <p>
                Capaian Pembelajaran Mata Kuliah adalah kemampuan yang harus
                dimiliki oleh mahasiswa pada setiap mata kuliah yang diambil.
                Capaian pembelajaran mata kuliah merupakan hasil dari proses
                penyusunan kurikulum program studi yang mengacu pada Standar
                Nasional Pendidikan Tinggi.
              </p>
            </div>
            <div className="card-data-button">
              <ModalInputCPMK />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <FooterComponent />
    </>
  );
};

export default InputData;
