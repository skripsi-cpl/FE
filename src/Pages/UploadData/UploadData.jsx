import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from 'react-dropzone'
import { BackButton, FooterComponent, NavbarDosenComponent, BreadCrumbComponents } from "../../Components";
import axios from "axios";
import cloud from "./cloud.png";
import SchoolIcon from '@mui/icons-material/School';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "./uploaddata.css";

// import { localStorage } from 'localStorage';

const UploadDataMhs = () => {
  const [mataKuliahOptions, setMataKuliahOptions] = useState([]);
  const [selectedTahunAjaran, setSelectedTahunAjaran] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedIdMk, setSelectedIdMk] = useState("");
  const [selectedKelas, setSelectedKelas] = useState("");
  const [kelasOptions, setKelasOptions] = useState([]);
  const [selectedMataKuliah, setSelectedMataKuliah] = useState("");
  const [tahunAjaranOptions, setTahunAjaranOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);

  // Mengambil informasi pengguna yang login dari localStorage
  const loggedInNama = localStorage.getItem('loggedInNama');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/tahun-ajaran-data"
        );
        const sortedData = response.data.sort((a, b) => a.id_TA - b.id_TA);
        setTahunAjaranOptions(sortedData.reverse());
      } catch (error) {
        console.error("Error fetching tahun ajaran data:", error);
      }
    };
    fetchData();
  }, []);

  const fetchMataKuliahData = async (selectedTahunAjaran) => {
    try {
      // Tidak perlu mengirim semesterType karena sudah ditentukan di server
      const response = await axios.get(
        `http://localhost:8000/api/mataKuliahBySemesterType?id_ta=${encodeURIComponent(
          selectedTahunAjaran
        )}`
      );
      setMataKuliahOptions(response.data);
    } catch (error) {
      console.error("Error fetching mata kuliah data:", error);
    }
  };

  useEffect(() => {
    fetchKelasData();
    fetchStatusOptions();
  }, []);

  const fetchKelasData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/kelas");
      setKelasOptions(response.data);
    } catch (error) {
      console.error("Error fetching kelas data:", error);
    }
  };

  const fetchStatusOptions = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/status");
      setStatusOptions(response.data);
    } catch (error) {
      console.error("Error fetching status options:", error);
    }
  };

  const handleTahunAjaranChange = (event) => {
    const selectedIdTA = event.target.value;
    console.log('Selected ID TA:', selectedIdTA);
    setSelectedTahunAjaran(selectedIdTA);
    fetchMataKuliahData(selectedIdTA);
  };

  const handleMataKuliahChange = (event) => {
    const selectedMataKuliah = event.target.value;
    setSelectedMataKuliah(selectedMataKuliah);

    const selectedOption = mataKuliahOptions.find(
      (option) => option.id_mk === selectedMataKuliah
    );
    setSelectedIdMk(selectedOption ? selectedOption.id_mk : "");
    setIsMataKuliahSelected(true);
  };

  const handleKelasChange = (event) => {
    setSelectedKelas(event.target.value);
    setIsKelasSelected(true);
  };


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    if (selectedIdMk && selectedTahunAjaran) {
      axios
        .get(`http://localhost:8000/api/kelas-with-status`, {
          params: {
            id_mk: selectedIdMk,
            tahun_ajaran: selectedTahunAjaran,
          },
        })
        .then((response) => {
          // Menggunakan Map untuk mendapatkan status terakhir dari setiap kelas
          const kelasStatusMap = new Map();
          response.data.forEach((kelas) => {
            kelasStatusMap.set(kelas.nama_kelas, kelas.status_upload || 'Belum');
          });

          // Mengubah map menjadi array untuk digunakan sebagai opsi dropdown
          const uniqueKelasOptions = Array.from(kelasStatusMap, ([nama_kelas, status_upload]) => ({
            nama_kelas,
            status_upload,
          }));

          setKelasOptions(uniqueKelasOptions);
        })
        .catch((error) => {
          console.error("Error fetching kelas with status data:", error);
        });
    }
  }, [selectedIdMk, selectedTahunAjaran]);

  useEffect(() => {
    console.log('Selected ID TA:', selectedTahunAjaran);
    console.log('User Input:', selectedKelas);
  }, [selectedTahunAjaran]);

  const handleUpload = async () => {
    if (!selectedTahunAjaran) {
      toast.error("Tahun Ajaran Harus Dipilih!",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      return;
    }
    if (!selectedMataKuliah) {
      toast.error("Mata Kuliah Harus Dipilih!",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      return;
    }
    if (!selectedKelas) {
      toast.error("Kelas Harus Dipilih!",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      return;
    }
    if (!selectedFile) {
      toast.error("File harus diunggah!",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("id_mk", selectedIdMk);
    formData.append("id_TA", selectedTahunAjaran);
    formData.append("nama_kelas", selectedKelas);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("File uploaded successfully: " + response.data.message,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        window.location.reload();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error Uploading File",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      // window.location.reload();
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setSelectedFile(event.dataTransfer.files[0]);
  };


  // Dropdown
  const [file, setFile] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles[0]);
    file && console.log(file);
    console.log(file.name);
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


  return (
    <>
      <NavbarDosenComponent />
      <div className="container-upload-mhs">
        <div className="header-all-content">
          <BackButton />
          <BreadCrumbComponents />
        </div>
        <div className="content-upload-mhs">
          <h2><SchoolIcon /> &nbsp; &nbsp;Dosen Pengampu</h2>
          <hr style={
            {
              color: '#000000',
              backgroundColor: '#000000',
              height: 1,
              borderColor: '#000000',
              marginBottom: 20
            }
          } />
          <h3>Pilih Tahun Ajaran</h3>
          <form action="" onDrop={handleDrop} onDragOver={handleDragOver}>
            <select
              value={selectedTahunAjaran}
              onChange={handleTahunAjaranChange}
            >
              <option key="default" value="">
                Pilih Tahun Ajaran
              </option>
              {tahunAjaranOptions.map((tahun) => (
                <option key={tahun.id_TA} value={tahun.id_TA}>
                  {tahun.periode}
                </option>
              ))}
            </select>

            <h3>Pilih Mata Kuliah</h3>
            <select
              value={selectedMataKuliah}
              onChange={handleMataKuliahChange}
            >
              <option key="default" value="">
                Pilih Mata Kuliah
              </option>
              {mataKuliahOptions.map((option) => (
                <option key={option.id_mk} value={option.id_mk}>
                  {`${option.id_mk} - ${option.kode_mk} - ${option.nama_mk}`}
                </option>
              ))}
            </select>

            <h3>Kelas</h3>
            {!selectedTahunAjaran || !selectedMataKuliah ? (
              <p>Pilih tahun ajaran dan Mata Kuliah Terlebih dahulu!</p>
            ) : (
              <select value={selectedKelas} onChange={handleKelasChange}>
                <option value="">Pilih Kelas</option>
                {kelasOptions.map((kelas) => (
                  <option key={kelas.id_kelas} value={kelas.nama_kelas}>
                    {`${kelas.nama_kelas} - ${kelas.status_upload}`}
                  </option>
                ))}
              </select>
            )}

            <h2>Upload File Nilai Berbasis OBE:</h2>
            <hr style={
              {
                color: '#000000',
                backgroundColor: '#000000',
                height: 1,
                borderColor: '#000000',
                marginBottom: 20
              }
            } />
            <h3>
              Masukkan File sesuai template : <a href=""> &nbsp; OBE.xlsx</a>
            </h3>
            <input
              type="file"
              accept=".xlsx, .csv"
              onChange={handleFileChange}
            />

            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <div className="upload-excel-wrapper">
                    <div
                      className="container-upload-excel-on-drop"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                    >
                      <br />
                      <br />
                      <br />
                      <p>Drop file here</p>
                    </div>
                  </div> :
                  <div className="upload-excel-wrapper">
                    <div
                      className="container-upload-excel"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                    >
                      <br />
                      <br />
                      <br />
                      <p>Drag and drop file here</p>
                    </div>
                  </div>
              }

            </div>

            <div className="button-excel-wrapper">
              <div className="button-excel">
                <button type="button" onClick={handleUpload}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
      <FooterComponent />
    </>
  );
};

export default UploadDataMhs;
