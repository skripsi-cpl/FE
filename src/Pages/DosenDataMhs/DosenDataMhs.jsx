import React, { useState, useEffect } from 'react';
import { NavbarDosenComponent, FooterComponent, TableDosen, BackButton, BreadCrumbComponents } from '../../Components';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import './dosendatamhs.css';
import axios from 'axios';

const DosenDataMhs = () => {
  const [selectedTahunMasuk, setSelectedTahunMasuk] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredMahasiswa, setFilteredMahasiswa] = useState([]);
  const [mahasiswaData, setMahasiswaData] = useState([]);
  const [loggedInkodeWali, setLoggedInkodeWali] = useState('');
  const [periodeData, setPeriodeData] = useState([]);

  useEffect(() => {
    const kodeWali = localStorage.getItem('loggedInkodeWali');
    setLoggedInkodeWali(kodeWali);
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/mahasiswa/indexTa');
        const filteredData = response.data.filter(mahasiswa => mahasiswa.kode_wali === kodeWali);
        setMahasiswaData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter data mahasiswa berdasarkan tahun masuk
    const filteredData = mahasiswaData.filter(
      (mhs) =>
        mhs.tahun_masuk == selectedTahunMasuk &&
        mhs.nama_mhs.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredMahasiswa(filteredData);
  }, [selectedTahunMasuk, searchKeyword, mahasiswaData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/mahasiswa/indexTa');
        const extractedPeriodes = response.data.map((item) => item.periode);
        setPeriodeData(extractedPeriodes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const tahunMasukOptions = [...new Set(mahasiswaData.map((mhs) => mhs.tahun_masuk))].sort().reverse();

  const handleTahunMasukChange = (event) => {
    setSelectedTahunMasuk(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  return (
    <>
      <NavbarDosenComponent />
      <div className="container-dosen-data-mhs">
        <div className="header-all-content">
          <BackButton />
          <BreadCrumbComponents />
        </div>
        <div className="content-dosen-data-mhs">
          <h2><DriveFolderUploadIcon />&nbsp; &nbsp;Dosen Wali</h2>
          <hr style={
            {
              color: '#000000',
              backgroundColor: '#000000',
              height: 1,
              borderColor: '#000000',
              marginBottom: 20
            }
          } />
          <div className="content-atas-data-mhs merge">
            <form action="">
              <h3>Cari Mahasiswa Perwalian</h3>
              <input type="text" value={searchKeyword} onChange={handleSearchChange} />
              <div className="right-side-data-mhs">
                <h3>Angkatan</h3>
                <select
                  value={selectedTahunMasuk}
                  onChange={handleTahunMasukChange}
                >
                  <option value="">Pilih Tahun Masuk Mahasiswa</option>
                  {tahunMasukOptions.map((tahun) => (
                    <option key={tahun} value={tahun}>
                      {tahun}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
          <h2>Mahasiswa Perwalian</h2>
          <hr style={
            {
              color: '#000000',
              backgroundColor: '#000000',
              height: 1,
              borderColor: '#000000',
              marginBottom: 20
            }
          } />
          <TableDosen filteredMahasiswa={filteredMahasiswa} />
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default DosenDataMhs;
