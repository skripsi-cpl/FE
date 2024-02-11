import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TableDepartemen = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Nama Mahasiswa</TableCell>
            <TableCell>Tahun Masuk</TableCell>
            <TableCell>Dosen Wali</TableCell>
            <TableCell>CPL (%)</TableCell>
            <TableCell>Action</TableCell>
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
              <TableCell><button onClick={() => handleClick(mahasiswa.NIM)}>Pilih Capaian</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableDepartemen;
