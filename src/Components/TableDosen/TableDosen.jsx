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
  const [cplData, setCplData] = useState({});
  const navigateTo = useNavigate();

  useEffect(() => {
    fetchData();
  }, [filteredMahasiswa, selectedSemester]);

  const fetchData = async () => {
    try {
      const nims = filteredMahasiswa.map(mahasiswa => mahasiswa.NIM);

      if (nims.length === 0) {
        return;
      }

      const cplResponses = await Promise.all(
        nims.map(nim => axios.get(`http://localhost:8000/api/cpl-by-nim?nim=${nim}`))
      );

      const cplData = {};
      cplResponses.forEach((response, index) => {
        const nim = nims[index];
        const data = response.data.data[0];
        if (data) {
          cplData[nim] = data.total_cpl;
        } else {
          cplData[nim] = "-";
        }
      });

      setCplData(cplData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClick = async (nim) => {
    try {
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
                {cplData[mahasiswa.NIM]}
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
