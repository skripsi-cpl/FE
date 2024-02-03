import { NavbarMhsComponent, FooterComponent } from "../../Components";
import "./PencapaianMhs.css";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import { Pie, Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom'; 
import {  Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';




const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
// Styles for PDF
const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

// Generate PDF content


const PencapaianMhs = () => {
    
    const handleGeneratePDF = () => {
        // Navigasi ke halaman Generate PDF saat tombol diklik
        navigate('/dashboardmhs/pencapaian/generate-pdf');
      };
    const navigate = useNavigate();

    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [idCplData, setIdCplData] = useState([]);
    const [idBobotData, setIdBobotData] = useState([]);
    const [totalBobotCpl, setTotalBobotCpl] = useState({});
    const [totalAllSemesters, setTotalAllSemesters] = useState(0);
    const [selectedMkData, setSelectedMkData] = useState([]);
    const [selectedBobotCPL, setSelectedBobotCPL] = useState([]);
    const [isDataAvailable, setIsDataAvailable] = useState(true);

    const nama = localStorage.getItem('loggedInNama');
    const nim = localStorage.getItem('loggedInNIM');

    const yourDataHere = {
        title: "Data Pencapaian Mahasiswa",
        students: [
          { name: "John Doe", score: 85 },
          { name: "Jane Smith", score: 90 },
          { name: "Alice Johnson", score: 78 }
        ]
      };
      

    const handleSemesterChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedSemester(selectedValue);
        setTotalBobotCpl({});

        fetch(`http://localhost:8000/api/dashboardmhs/pencapaian?NIM=${nim}&semester_mk=${selectedValue}`)
            .then(response => response.json())
            .then(data => {
                setFilteredData(data.data);

            })
            .catch(error => console.error('There was an error!', error));
    };

    useEffect(() => {
        fetch('http://localhost:8000/api/dashboardmhs/getIdCpl')
            .then(response => response.json())
            .then(data => {
                setIdCplData(data);
            })
            .catch(error => console.error('There was an error!', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8000/api/dashboardmhs/getBobotCpl')
            .then(response => response.json())
            .then(data => {
                setIdBobotData(data);
            })
            .catch(error => console.error('There was an error!', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8000/api/dashboardmhs/filtersemester')
            .then(response => response.json())
            .then(data => {
                setSemesters(data);
                if (data.length > 0) {
                    setSelectedSemester(data[0].id_TA);
                }
            })
            .catch(error => console.error('There was an error!', error));
    }, []);

    useEffect(() => {
        setIsDataAvailable(filteredData && filteredData.length > 0);
    }, [filteredData]);

    useEffect(() => {
        const calculateTotalBobotCpl = () => {
            const totals = { ...totalBobotCpl };
            const idCplToBobot = {};
            idBobotData.forEach((item) => {
                idCplToBobot[item.id_cpl] = parseFloat(item.bobot_cpl || 0);
            });
            if (filteredData && filteredData.length > 0) {
                const namaMataKuliah = filteredData.map(row => row.nama_mk);
                setSelectedMkData(namaMataKuliah);
                const bobotCPLPerMK = filteredData.map(row => row.bobot_cpl);
                setSelectedBobotCPL(bobotCPLPerMK);

                filteredData.forEach((row) => {
                    const bobotCpl = idCplToBobot[row.id_cpl];
                    if (bobotCpl !== undefined) {
                        totals[row.id_cpl] = (totals[row.id_cpl] || 0) + bobotCpl;
                    }
                });
            } else {
                console.error('Filtered data is undefined or empty.');
            }
            const totalThisSemester = Object.values(totals).reduce((acc, curr) => acc + curr, 0);
            setTotalAllSemesters(prevTotal => prevTotal + totalThisSemester);
            setTotalBobotCpl(totals);
        };

        calculateTotalBobotCpl();
    }, [filteredData, idBobotData]);
    
    return (
        <>
            <NavbarMhsComponent />
            <div className="container-dosen-data-mhs">

                <div className="content-pencapaian-mhs">
                    <form action="">
                        <h3>Pilih Semester</h3>
                        <select value={selectedSemester} onChange={handleSemesterChange}>
                            {semesters.map((semester, index) => (
                                <option key={index} value={semester.id_TA}>
                                    {semester.id_TA}
                                </option>
                            ))}
                        </select>
                    </form>

                    <h3>Filters</h3>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Mata Kuliah</StyledTableCell>
                                    {idCplData.length > 0 &&
                                        idCplData.map((item, index) => (
                                            <StyledTableCell align="center" key={index}>
                                                ID CPL-{item.id_cpl.slice(-2)}
                                            </StyledTableCell>
                                        ))
                                    }
                                    <StyledTableCell>Total</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.isArray(filteredData) && filteredData?.length > 0 ? (
                                    filteredData.map((row, index) => {
                                        const bobotCplFiltered = idBobotData.filter(item => item.id_cpl === row.id_cpl);

                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{row.nama_mk}</TableCell>
                                                {idCplData.map((cpl, idx) => {
                                                    const matchedBobotCpl = bobotCplFiltered.find(bobot => bobot.id_cpl === cpl.id_cpl);
                                                    return (
                                                        <StyledTableCell align="center" key={idx}>
                                                            {matchedBobotCpl ? matchedBobotCpl.bobot_cpl : '-'}
                                                        </StyledTableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={idCplData.length + 2}>No data available</TableCell>
                                    </TableRow>
                                )}

                            </TableBody>
                            <TableRow>
                                <TableCell>Jumlah</TableCell>
                                {Array.isArray(filteredData) && filteredData.length > 0 && idCplData.map((cpl, idx) => (
                                    <StyledTableCell align="center" key={idx}>
                                        {totalBobotCpl[cpl.id_cpl] || 0}
                                    </StyledTableCell>
                                ))}
                                {Array.isArray(filteredData) && filteredData.length > 0 && (
                                    <StyledTableCell align="center">
                                        {Object.values(totalBobotCpl).reduce((curr) => curr, 0) + totalAllSemesters}
                                    </StyledTableCell>
                                )}
                            </TableRow>

                        </Table>
                    </TableContainer>
                    <br /><br /><br />

                    <div>
                        <h3>Diagram Lingkaran</h3>
                    </div>
                    <div className="operator-2">
                        <Pie
                            data={{
                                labels: isDataAvailable ? selectedMkData : ['Not Available'],
                                datasets: [
                                    {
                                        label: 'Bobot CPL',
                                        data: isDataAvailable ? selectedBobotCPL : [0],
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(255, 159, 64, 0.2)',
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(255, 159, 64, 0.2)',
                                        ],
                                        borderWidth: 1,
                                    },
                                ],
                            }}
                            height={300}
                            width={500}
                            options={{
                                maintainAspectRatio: false,
                                plugins: {
                                    datalabels: {
                                        display: isDataAvailable ? true : false,
                                        formatter: (value, context) => {
                                            return isDataAvailable ? selectedBobotCPL[context.dataIndex] : '';
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                    
                    <div>
                        <h3>Diagram Garis</h3>
                    </div>
                    <div className='content'>
                        <Line
                            data={{
                                labels: ["Semester 1", "2", "3", "4", "5", "6", "7"],
                                datasets: [
                                    {
                                        label: "My First Dataset",
                                        data: [65, 59, 80, 81, 56, 55, 40],
                                        fill: false,
                                        borderColor: "rgba(75,192,192,1)",
                                        tension: 0.1
                                    }
                                ]
                            }}
                            height={400}
                            width={600}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                }
                            }}
                        />
                    </div>
                    <button onClick={handleGeneratePDF}>Generate PDF</button>

                </div>
                <br /><br /><br />
            </div>
            <FooterComponent />
        </>
    );
};

export default PencapaianMhs;
