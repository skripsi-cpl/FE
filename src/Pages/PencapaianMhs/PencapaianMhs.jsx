import { NavbarMhsComponent, FooterComponent} from "../../Components";
import "./PencapaianMhs.css"
import { useEffect,useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { loggedInNama,loggedInNIM } from '../DashboardMhs/DashboardMhs'
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
const PencapaianMhs = () => {
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState('');
    const [filteredData, setFilteredData] = useState([]);
 
    const handleSemesterChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedSemester(selectedValue);

        // Mengambil data berdasarkan semester yang dipilih dari API
        fetch(`http://localhost:8000/api/dashboardmhs/pencapaian?NIM=${loggedInNIM}&semester_mk=${selectedValue}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.data); // Periksa data yang diperoleh dari permintaan ke backend
                setFilteredData(data.data);
            })
            .catch(error => console.error('There was an error!', error));
            
            
    };

    useEffect(() => {
        // Mengambil data semua semester dari API
        fetch('http://localhost:8000/api/dashboardmhs/filtersemester')
            .then(response => response.json())
            .then(data => {
                setSemesters(data);
                if (data.length > 0) {
                    setSelectedSemester(data[0].semester_TA);
                   
                }
            })
            .catch(error => console.error('There was an error!', error));
    }, []);
    return (
        <>
            <NavbarMhsComponent />
            <div className="container-dosen-data-mhs">
                <h1>Haloooo {loggedInNama}</h1>

                <div className="content-dosen-data-mhs">
                    <form action="">
                    <h3>Pilih Semester</h3>
                        <select value={selectedSemester} onChange={handleSemesterChange}>
                            {semesters.map((semester, index) => (
                                <option key={index} value={semester.semester_TA}>
                                    {semester.semester_TA}
                                </option>
                            ))}
                        </select>
                    </form>

                    <h3>Filters</h3>
                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Kode MK</StyledTableCell>
                            <StyledTableCell align="right">Mata Kuliah</StyledTableCell>
                            <StyledTableCell align="right">sks</StyledTableCell>
                            <StyledTableCell align="right">CPL</StyledTableCell>
                            <StyledTableCell align="right">Bobot CPL</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        
                            {Array.isArray(filteredData) && filteredData?.length > 0 ? (
                            filteredData.map((row, index) => (
                                <TableRow key={index}>
                                <TableCell>{row.kode_mk}</TableCell>
                                <TableCell align="right">{row.nama_mk}</TableCell>
                                <TableCell align="right">{row.sks}</TableCell>
                                <TableCell align="right">{row.id_cpl}</TableCell>
                                <TableCell align="right">{row.bobot_cpl}</TableCell>
                                </TableRow>
                            ))
                            ) : (
                            <TableRow>
                                <TableCell colSpan={5}>No data available</TableCell>
                            </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    </TableContainer>

                </div>
            </div>
            <FooterComponent />
        </>
    );
};

export default PencapaianMhs;
