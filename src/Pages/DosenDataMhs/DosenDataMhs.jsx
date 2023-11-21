import { useState, useEffect } from 'react';
import { NavbarDosenComponent, FooterComponent, TableDosen } from '../../Components';
import './dosendatamhs.css';
import axios from 'axios';

const DosenDataMhs = () => {
  const [selectedTahunMasuk, setSelectedTahunMasuk] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredMahasiswa, setFilteredMahasiswa] = useState([]);
  const [mahasiswaData, setMahasiswaData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/mahasiswa');
        console.log('Response from API:', response.data);
        setMahasiswaData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter data mahasiswa berdasarkan tahun masuk dan kata kunci pencarian
    const filteredData = mahasiswaData.filter(
      (mhs) =>
        mhs.tahun_masuk == selectedTahunMasuk &&
        mhs.nama_mhs.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredMahasiswa(filteredData);
  }, [selectedTahunMasuk, searchKeyword, mahasiswaData]);

  const tahunMasukOptions = [...new Set(mahasiswaData.map((mhs) => mhs.tahun_masuk))];

  const handleTahunMasukChange = (event) => {
    setSelectedTahunMasuk(event.target.value);
    console.log(setSelectedTahunMasuk);
  };

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  return (
    <>
      <NavbarDosenComponent />
      <div className="container-dosen-data-mhs">
        <h1>Dosen Wali</h1>
        <div className="content-dosen-data-mhs">
          <form action="">
            <h3>Cari Mahasiswa Perwalian</h3>
            <input type="text" value={searchKeyword} onChange={handleSearchChange} />
          </form>
          <h3>Filters</h3>
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
          <TableDosen filteredMahasiswa={filteredMahasiswa} />
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default DosenDataMhs;
