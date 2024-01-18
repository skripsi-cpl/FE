import React, { useState, useEffect } from "react";
import { FooterComponent, NavbarDosenComponent } from "../../Components";
import "./uploaddata.css";
import { Button } from "react-bootstrap";
import axios from "axios";

const UploadDataMhs = () => {
  const [mataKuliahOptions, setMataKuliahOptions] = useState([]);
  const [selectedTahunAjaran, setSelectedTahunAjaran] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedIdMk, setSelectedIdMk] = useState(""); // Tambahkan state id_mk
  const [selectedKelas, setSelectedKelas] = useState([]);
  const [kelasOptions, setKelasOptions] = useState([]);
  const [selectedMataKuliah, setSelectedMataKuliah] = useState("");
  const [tahunAjaranOptions, setTahunAjaranOptions] = useState([]);
  const [selectedSemesterType, setSelectedSemesterType] = useState("");
  const sortedTahunAjaran = tahunAjaranOptions.sort((a, b) => b - a);
  const [statusOptions, setStatusOptions] = useState([]);
  // const [kelasStatus, setKelasStatus] = useState({
  //   A: "Belum",
  //   B: "Belum",
  //   C: "Belum",
  //   D: "Belum",
  // });
  // const [statusOptions, setStatusOptions] = useState({
  //   A: "Belum",
  //   B: "Belum",
  //   C: "Belum",
  //   D: "Belum",
  // });

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/tahun-ajaran-data"
        );
        const sortedData = response.data.sort((a, b) => {
          // Anggap 'periode' adalah dalam format 'YYYY/YYYY'
          return b.periode.localeCompare(a.periode);
        });
        setTahunAjaranOptions(sortedData);
      } catch (error) {
        console.error("Error fetching tahun ajaran data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchMataKuliahData = async () => {
    try {
      if (selectedSemesterType) {
        const response = await axios.get(
          `http://localhost:8000/api/mata_kuliah?semester_type=${selectedSemesterType}`
        );
        console.log(`${selectedSemesterType}`);
        console.log("Response from mata_kuliah API:", response.data);

        const options = response.data.map((mataKuliah) => ({
          id_mk: mataKuliah.id_mk,
          nama_mk: mataKuliah.nama_mk,
          kode_mk: mataKuliah.kode_mk,
          semester_mk: mataKuliah.semester_mk,
        }));

        // Tampilkan semua mata kuliah tanpa filter
        setMataKuliahOptions(options);
      } else {
        setMataKuliahOptions([]);
      }
    } catch (error) {
      console.error("Error fetching mata kuliah data:", error);
      if (error.response) {
        console.log("Server response:", error.response.data);
      }
    }
  };
  useEffect(() => {
    fetchMataKuliahData();
  }, [selectedSemesterType]);

  const fetchKelasData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/kelas");
      console.log("Response from kelas API:", response.data);
  
      const options = response.data.map((kelas) => ({
        id_kelas: kelas.id_kelas,
        nama_kelas: kelas.nama_kelas,
      }));
  
      setKelasOptions(options);
      
    } catch (error) {
      console.error("Error fetching kelas data:", error);
      if (error.response) {
        console.log("Server response:", error.response.data);
      }
    }
  };
  
  useEffect(() => {
    fetchKelasData();
  }, []);


  useEffect(() => {
    const fetchStatusOptions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/status");
        setStatusOptions(response.data);
      } catch (error) {
        console.error("Error fetching status options:", error);
      }
    };

    fetchStatusOptions();
  }, []);
  const handleTahunAjaranChange = (event) => {
    setSelectedTahunAjaran(event.target.value);
  };

  // const cekStatusUpload = async (kelas) => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:8000/api/cek-status-upload",
  //       {
  //         params: {
  //           tahun_ajaran: selectedTahunAjaran,
  //           id_mk: selectedMataKuliah,
  //           kelas: kelas,
  //         },
  //       }
  //     );

  //     setKelasStatus((prevStatus) => ({
  //       ...prevStatus,
  //       [kelas]: response.data.status,
  //     }));
  //   } catch (error) {
  //     console.error("Error fetching status upload:", error);
  //   }
  // };

  // useEffect(() => {
  //   ["A", "B", "C", "D"].forEach((kelas) => cekStatusUpload(kelas));
  // }, [selectedTahunAjaran, selectedMataKuliah]);

  const handleSemesterTypeChange = (event) => {
    setSelectedSemesterType(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleMataKuliahChange = (event) => {
    setSelectedMataKuliah(event.target.value);
    // Tambahkan ini untuk menyimpan id_mk terpilih
    const selectedOption = mataKuliahOptions.find(
      (option) => option.id_mk === event.target.value
    );
    setSelectedIdMk(selectedOption ? selectedOption.id_mk : "");
    
  };
  const handleKelasChange = async (event) => {
    const selectedKelas = event.target.value;
    setSelectedKelas(selectedKelas);

    // Extract selectedIdMk from the selected option
    const selectedOption = mataKuliahOptions.find(
        (option) => option.nama_kelas === selectedKelas
    );
    const selectedIdMk = selectedOption ? selectedOption.id_mk : "";

    // Make an API request to get the status
    try {
        const response = await axios.get(
            `http://localhost:8000/api/cek-status-upload?id_mk=${selectedIdMk}&kelas=${selectedKelas}`
        );

        const status = response.data.status;

        // Update the status in the dropdown
        setStatusOptions((prevStatusOptions) => {
            const updatedStatusOptions = prevStatusOptions.map((kelas) => {
                if (kelas.nama_kelas === selectedKelas) {
                    return {
                        ...kelas,
                        status: status,
                    };
                }
                return kelas;
            });
            return updatedStatusOptions;
        });
    } catch (error) {
        console.error("Error fetching status:", error);
    }
};


  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("id_mk", selectedIdMk); 
    formData.append("nama_kelas", selectedKelas); 
    
    try {
      const response = await axios.post(
        "http://localhost:8000/api/upload-nilai", // Sesuaikan dengan URL API Laravel Anda
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("File uploaded successfully: " + response.data.message);
        
        // Pemanggilan fungsi cekStatusUpload untuk kelas yang diupload
        // cekStatusUpload(selectedKelas); // Anggap selectedKelas adalah state yang menyimpan kelas yang dipilih
        window.location.reload();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
      window.location.reload();
    }
  };

  return (
    <>
      <NavbarDosenComponent />
      <div className="container-upload-mhs">
        <h1>Dosen Pengampu!</h1>
        <div className="content-upload-mhs">
          <form action="" onDrop={handleDrop} onDragOver={handleDragOver}>
            <select
              value={selectedTahunAjaran}
              onChange={handleTahunAjaranChange}
            >
              <option key="default" value="">
                Pilih Tahun Ajaran
              </option>
              {tahunAjaranOptions.map((tahun, index) => (
                <option key={index} value={tahun.periode}>
                  {tahun.periode}
                </option>
              ))}
            </select>

            <h3>Pilih Semester</h3>
            <select
              value={selectedSemesterType}
              onChange={handleSemesterTypeChange}
            >
              <option value="">Pilih Semester</option>
              <option value="genap">Semester Genap</option>
              <option value="ganjil">Semester Ganjil</option>
            </select>
            <h3>Pilih Mata Kuliah</h3>
            <select
              value={selectedMataKuliah}
              onChange={handleMataKuliahChange}
            >
              {mataKuliahOptions.map((option) => (
                  <option key={option.id_mk} value={option.id_mk}>
                    {`${option.id_mk} - ${option.kode_mk} - ${option.nama_mk}`}
                  </option>
                ))}
              </select>
            <h3>Kelas</h3>
            <select value={selectedKelas} onChange={handleKelasChange}>
                <option value="">Pilih Kelas</option>
                {kelasOptions.map((kelas) => (
                    <option key={kelas.id_kelas} value={kelas.nama_kelas}>
                        {`${kelas.nama_kelas} - ${statusOptions.find((status) => status.nama_kelas === kelas.nama_kelas)?.status ?? "Belum"}`}


                    </option>
                ))}
            </select>



            <h3>Upload File Nilai Berbasis OBE:</h3>
            {/* <h4>
              File template : <a href="">OBE.xlsx</a>
            </h4> */}
            <input
              type="file"
              accept=".xlsx, .csv"
              onChange={handleFileChange}
            />
            <div className="upload-excel-wrapper">
              <div
                className="container-upload-excel"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <img src="cloud.png" alt="Cloud" />
                <p>Drag and drop file here</p>
              </div>
            </div>
            <div className="button-excel-wrapper">
              <div className="button-excel">
                <Button variant="primary" type="button" onClick={handleUpload}>
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <FooterComponent /> */}
    </>
  );
};

export default UploadDataMhs;
