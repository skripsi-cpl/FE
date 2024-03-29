import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavbarDepartmentComponent, FooterComponent, TableDepartemen, BreadCrumbComponents, BackButton } from "../../Components";
import "./PencapaianDepartment.css";

const PencapaianDepartment = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [dosenWali, setDosenWali] = useState([]);
  const [selectedTahunMasuk, setSelectedTahunMasuk] = useState('');
  const [selectedDosenWali, setSelectedDosenWali] = useState('');
  const [filteredMahasiswa, setFilteredMahasiswa] = useState([]);

  useEffect(() => {
    const fetchMahasiswa = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/mahasiswa/indexTa');
        setMahasiswa(response.data);
        const dosenWaliUnik = Array.from(new Set(response.data.map(item => item.nama_wali)));
        setDosenWali(dosenWaliUnik);
      } catch (error) {
        console.error("Error fetching mahasiswa data:", error);
      }
    };
    fetchMahasiswa();
  }, []);

  useEffect(() => {
    let filteredData = mahasiswa;

    if (selectedTahunMasuk) {
      filteredData = filteredData.filter(mhs => mhs.tahun_masuk.toString() === selectedTahunMasuk);

      if (selectedDosenWali) {
        filteredData = filteredData.filter(mhs => mhs.nama_wali === selectedDosenWali);
      }
    } else {
      filteredData = [];
    }

    setFilteredMahasiswa(filteredData);
  }, [selectedTahunMasuk, selectedDosenWali, mahasiswa]);


  return (
    <>
      <NavbarDepartmentComponent />
      <div className="container-dosen-pencapaian-mhs">
        <div className="header-all-content">
          <BackButton />
          <BreadCrumbComponents />
        </div>
        <div className="content-dosen-pencapaian-mhs">
          <h2>Pencapaian Mahasiswa</h2>
          <hr style={
            {
              color: '#000000',
              backgroundColor: '#000000',
              height: 1,
              borderColor: '#000000',
              marginBottom: 20
            }
          } />
          <h3>Pilih Tahun Angkatan</h3>
          <select value={selectedTahunMasuk} onChange={(e) => setSelectedTahunMasuk(e.target.value)}>
            <option value="">Pilih Angkatan</option>
            {Array.from(new Set(mahasiswa.map(mhs => mhs.tahun_masuk)))
              .sort((a, b) => a - b)
              .reverse()
              .map(tahun => (
                <option key={tahun} value={tahun}>{tahun}</option>
              ))}
          </select>
          <h3>Pilih Dosen Wali</h3>
          <select value={selectedDosenWali} onChange={(e) => setSelectedDosenWali(e.target.value)}>
            <option value="">Pilih Dosen Wali</option>
            {dosenWali.map((dosen, index) => (
              <option key={index} value={dosen}>{dosen}</option>
            ))}
          </select>
          <TableDepartemen data={filteredMahasiswa} />
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default PencapaianDepartment;
