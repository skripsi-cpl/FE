import React, { useState, useEffect } from "react";
import { FooterComponent, NavbarDosenComponent } from "../../Components";
import "./uploaddata.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadDataMhs = () => {
  const [mataKuliahOptions, setMataKuliahOptions] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedMataKuliah, setSelectedMataKuliah] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedSemester) {
          const response = await axios.get(
            `http://localhost:8000/api/mata_kuliah?semester=${selectedSemester}`
          );
          console.log("Response from API:", response.data);

          const options = response.data.map((mataKuliah) => mataKuliah.nama_mk);
          setMataKuliahOptions(options);
        } else {
          setMataKuliahOptions([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedSemester]);

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleMataKuliahChange = (event) => {
    setSelectedMataKuliah(event.target.value);
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
    formData.append('file', selectedFile);
    formData.append('semester', selectedSemester);
    formData.append('mata_kuliah', selectedMataKuliah);

    try {
      const response = await axios.post('http://localhost:8000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Berhasil mengupload file');

      // Auto-refresh after a successful upload
      window.location.reload();
    } catch (error) {
      toast.error('Gagal mengupload file');
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
      <NavbarDosenComponent />
      <div className="container-upload-mhs">
        <h1>Dosen Pengampu</h1>
        <div className="content-upload-mhs">
          <form action="" onDrop={handleDrop} onDragOver={handleDragOver}>
            <h3>Pilih Semester</h3>
            <select value={selectedSemester} onChange={handleSemesterChange}>
              <option value="">Pilih Semester</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
              <option value="7">Semester 7</option>
              <option value="8">Semester 8</option>
            </select>

            <h3>Pilih Mata Kuliah</h3>
            <select value={selectedMataKuliah} onChange={handleMataKuliahChange}>
              {mataKuliahOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <h3>Upload File Nilai Berbasis OBE:</h3>

            <h4>
              File template : <a href="">OBE.xlsx</a>
            </h4>
            <input type="file" accept=".xlsx, .csv" onChange={handleFileChange} />
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
                <button type="button" onClick={handleUpload}>Submit</button>
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
