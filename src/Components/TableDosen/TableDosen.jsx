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

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({
  filteredMahasiswa,
  selectedSemester,
}) {
  const [nilaiCplData, setNilaiCplData] = useState({});
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchCplData = async () => {
      const nilaiCplObject = {};
      for (const mahasiswa of filteredMahasiswa) {
        try {
          const response = await axios.get(`http://localhost:8000/api/cpl-by-nim?nim=${mahasiswa.NIM}`);
          const total_cpl = response.data.data.total_cpl;
          setNilaiCplData(prevState => ({
            ...prevState,
            [mahasiswa.NIM]: total_cpl
          }));
        } catch (error) {
          console.error(`Error fetching data for NIM ${mahasiswa.NIM}:`, error);
          nilaiCplObject[mahasiswa.NIM] = "-";
        }
      }
    };

    fetchCplData();
  }, [filteredMahasiswa]);


  const handleClick = (nim) => {
    try {
      navigateTo(`/dashboard-dosen/capaian-pembelajaran/${nim}`);
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell align="center">Nama</StyledTableCell>
            <StyledTableCell align="center">NIM</StyledTableCell>
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
              <StyledTableCell align="center">
                {mahasiswa.NIM}
              </StyledTableCell>
              <StyledTableCell align="center">
                {nilaiCplData[mahasiswa.NIM] !== undefined ? nilaiCplData[mahasiswa.NIM] : "-"}
              </StyledTableCell>
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
