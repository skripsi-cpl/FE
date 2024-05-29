import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const TableDepartemen = ({ data }) => {
  const [cplData, setCplData] = useState({});
  const navigateTo = useNavigate();

  useEffect(() => {
    fetchData();
  }, [data]);

  const fetchData = async () => {
    try {
      const nims = data.map(mahasiswa => mahasiswa.NIM);
      if (nims.length === 0) {
        return;
      }

      const cplResponses = await Promise.all(
        nims.map(nim => axios.get(`http://localhost:8000/api/cpl-by-nim?nim=${nim}`))
      );

      const fetchedCplData = {};
      cplResponses.forEach((response, index) => {
        const nim = nims[index];
        const responseData = response.data.data;
        if (responseData && responseData.total_cpl !== undefined) {
          fetchedCplData[nim] = responseData.total_cpl;
        } else {
          fetchedCplData[nim] = "-";
        }
      });

      setCplData(fetchedCplData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClick = (nim) => {
    navigateTo(`/dashboard-departemen/capaian-pembelajaran/${nim}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>Nama Mahasiswa</StyledTableCell>
            <StyledTableCell>Tahun Masuk</StyledTableCell>
            <StyledTableCell>Dosen Wali</StyledTableCell>
            <StyledTableCell align="center">CPL (%)</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((mahasiswa, index) => (
            <TableRow
              key={mahasiswa.NIM}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{mahasiswa.nama_mhs}</TableCell>
              <TableCell>{mahasiswa.tahun_masuk}</TableCell>
              <TableCell>{mahasiswa.nama_wali}</TableCell>
              <StyledTableCell align="center">
                {cplData[mahasiswa.NIM] || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                <button onClick={() => handleClick(mahasiswa.NIM)} className="button-table-dosen">Pilih Capaian</button>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableDepartemen;
