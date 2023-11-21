import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function CustomizedTables({ filteredMahasiswa }) {
  const [mahasiswaData, setMahasiswaData] = React.useState([]);

const fetchData = async () => {
    try {
        const response = await axios.get(
            `http://localhost:8000/api/mahasiswa?tahun_masuk=${filteredMahasiswa}`
        );
        console.log('Response from API:', response.data);
        setMahasiswaData(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

  useEffect(() => {
    fetchData();
  }, [filteredMahasiswa]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
        <TableRow>
                        <StyledTableCell >No</StyledTableCell>
                        <StyledTableCell align="center">Nama</StyledTableCell>
                        <StyledTableCell align="center">Kode MK</StyledTableCell>
                        <StyledTableCell align="center">Kode MK</StyledTableCell>
                        <StyledTableCell align="center">Kode MK</StyledTableCell>
                        <StyledTableCell align="center">Kode MK</StyledTableCell>
                        <StyledTableCell align="center">Kode MK</StyledTableCell>
                        <StyledTableCell align="center">Kode MK</StyledTableCell>
                        <StyledTableCell align="center">CPL (%)</StyledTableCell>
                    </TableRow>
        </TableHead>
        <TableBody>
          {filteredMahasiswa.map((mahasiswa, index) => (
            <StyledTableRow key={mahasiswa.NIM}>
              <StyledTableCell>{index + 1}</StyledTableCell>
              <StyledTableCell align="center">{mahasiswa.nama_mhs}</StyledTableCell>
              <StyledTableCell align="center">{''}</StyledTableCell>
              <StyledTableCell align="center">{''}</StyledTableCell>
              <StyledTableCell align="center">{''}</StyledTableCell>
              <StyledTableCell align="center">{''}</StyledTableCell>
              <StyledTableCell align="center">{''}</StyledTableCell>
              <StyledTableCell align="center">{''}</StyledTableCell>
              <StyledTableCell align="center">{''}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
