import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Table.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({
  filteredMahasiswa,
  selectedSemester,
}) {
  const [mahasiswaData, setMahasiswaData] = useState([]);
  const [mataKuliahData, setMataKuliahData] = useState([]);
  const navigateTo = useNavigate(); // Using useNavigate hook for navigation

  const fetchData = async () => {
    try {
      const mahasiswaResponse = await axios.get(
        `http://localhost:8000/api/mahasiswa?tahun_masuk=${filteredMahasiswa}`
      );

      const mataKuliahResponse = await axios.get(
        `http://localhost:8000/api/mahasiswa/indexTa?periode=${selectedSemester}`
      );

      console.log("Response from Mahasiswa API:", mahasiswaResponse.data);
      console.log("Response from Mata Kuliah API:", mataKuliahResponse.data);

      setMahasiswaData(mahasiswaResponse.data);
      setMataKuliahData(mataKuliahResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filteredMahasiswa, selectedSemester]);

  // Function to navigate to a specific URL
  const handleClick = async (nim) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/mahasiswa?tahun_masuk=${filteredMahasiswa}`
      );
      console.log("Response from API:", response.data);
      // Navigate to the PencapaianMhs component after receiving the data
      navigateTo(`/dashboarddosen/capaianpembelajaran/${nim}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell align="center">Nama</StyledTableCell>
            <StyledTableCell align="center">CPL (%)</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredMahasiswa.map((mahasiswa, index) => (
            <StyledTableRow key={mahasiswa.NIM}>
              <StyledTableCell>{index + 1}</StyledTableCell>
              <StyledTableCell align="center">
                {mahasiswa.nama_mhs}
              </StyledTableCell>

              <StyledTableCell align="center">{"kaskdasm"}</StyledTableCell>
              <StyledTableCell align="center">
                <button onClick={() => handleClick(mahasiswa.NIM)} className="button-table-dosen">Pilih Capaian</button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
