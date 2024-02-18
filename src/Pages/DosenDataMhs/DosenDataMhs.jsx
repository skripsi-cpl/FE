import { useState, useEffect } from 'react';
import { NavbarDosenComponent, FooterComponent, TableDosen } from '../../Components';
import './dosendatamhs.css';
import axios from 'axios';

const DosenDataMhs = () => {
  const [selectedTahunMasuk, setSelectedTahunMasuk] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredMahasiswa, setFilteredMahasiswa] = useState([]);
  const [mahasiswaData, setMahasiswaData] = useState([]);
  const [periodeData, setPeriodeData] = useState([]); // State untuk menyimpan data periode
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/mahasiswa/indexTa');
        const extractedPeriodes = response.data.map((item) => item.periode);
        setPeriodeData(extractedPeriodes);
        // Mengambil data periode dari respons API dan menyimpannya dalam state periodeData
        if (response.data.periode) {
          setPeriodeData(response.data);

        }
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

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };


  return (
    <>
      <NavbarDosenComponent />
      <div className="container-dosen-data-mhs">
        <div className="content-dosen-data-mhs">
          <div className="content-atas-data-mhs merge">
            <form action="">
              <h3>Cari Mahasiswa Perwalian</h3>
              <input type="text" value={searchKeyword} onChange={handleSearchChange} />
            </form>
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
              <h3>Tahun Ajaran</h3>
              <select
                value={selectedSemester}
                onChange={handleSemesterChange}
              >
                <option value="">Pilih Tahun Ajaran</option>
                {periodeData.map((periode) => (
                  <option key={periode} value={periode}>
                    {periode}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <TableDosen filteredMahasiswa={filteredMahasiswa} selectedSemester={selectedSemester} />
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default DosenDataMhs;
