import React from 'react';
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


const TableDepartemen = ({ data }) => {

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const navigateTo = useNavigate();
  const handleClick = async (nim) => {
    try {
      
      navigateTo(`/dashboarddepartment/capaianpembelajaran/${nim}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
            <StyledTableCell>CPL (%)</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
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
              <TableCell>{"kaskdasm"}</TableCell>
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
