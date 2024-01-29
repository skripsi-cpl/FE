import { NavbarMhsComponent, FooterComponent } from "../../Components";
import "../../Pages/PencapaianMhs/PencapaianMhs.css";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Pie } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';



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
    const [idCplData, setIdCplData] = useState([]);
    const [idBobotData, setIdBobotData] = useState([]);
    const [totalBobotCpl, setTotalBobotCpl] = useState({});
    const [totalAllSemesters, setTotalAllSemesters] = useState(0);
    const [selectedMkData, setSelectedMkData] = useState([]);
    const [selectedBobotCPL, setSelectedBobotCPL] = useState([]);
    const [isDataAvailable, setIsDataAvailable] = useState(true);
    // const [totalsBySemester, setTotalsBySemester] = useState({});
    // localStorage.setItem('loggedInNama', loggedInNama);
    // localStorage.setItem('loggedInNIM', loggedInNIM);
    const { nim } = useParams();

  // Sekarang Anda dapat menggunakan nim di sini
    console.log(nim);
    
    // console.log(nama)
    // console.log(nim)
    const handleSemesterChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedSemester(selectedValue);

        // Reset nilai totalsBySemester dan totalBobotCpl
        // setTotalsBySemester({});
        setTotalBobotCpl({});

        // Mengambil data berdasarkan semester yang dipilih dari API
        fetch(`http://localhost:8000/api/dashboardmhs/pencapaian?NIM=${nim}&semester_mk=${selectedValue}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.data); // Periksa data yang diperoleh dari permintaan ke backend
                setFilteredData(data.data);
                
                // Memperbarui data mata kuliah yang sesuai dengan semester yang dipilih
            })
            .catch(error => console.error('There was an error!', error));
    };
    // Mengambil semua data id_cpl dari API


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
    useEffect(() => {
        setIsDataAvailable(filteredData && filteredData.length > 0);
    }, [filteredData]);
    useEffect(() => {
        const calculateTotalBobotCpl = () => {
            const totals = { ...totalBobotCpl };

            // Membuat objek untuk memetakan id_cpl ke bobot_cpl dari idBobotData
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
                console.error('Filtered data is undefined or empty.'); // Pesan kesalahan jika filteredData tidak valid
            }
            
            const totalThisSemester = Object.values(totals).reduce((acc, curr) => acc + curr, 0);
            setTotalAllSemesters(prevTotal => prevTotal + totalThisSemester);
            console.log('Total All Semesters:', totalAllSemesters); // Cek total akumulasi dari semua semester
            setTotalBobotCpl(totals);
            console.log(totals);
        };


        calculateTotalBobotCpl();
    }, [filteredData, idBobotData]);




    return (
        <>
            <NavbarMhsComponent />
            <div className="container-dosen-data-mhs">
                <h1>Haloooo {nim}</h1>

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
                                        // Temukan bobot_cpl yang sesuai dengan mata kuliah pada setiap semester
                                        const bobotCplFiltered = idBobotData.filter(item => item.id_cpl === row.id_cpl);

                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{row.nama_mk}</TableCell>
                                                {/* Menampilkan nilai bobot_cpl yang sesuai */}
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
                            {/* Baris "Jumlah" */}
                            <TableRow>
                                <TableCell>Jumlah</TableCell>
                                {Array.isArray(filteredData) && filteredData.length > 0 && idCplData.map((cpl, idx) => (
                                    <StyledTableCell align="center" key={idx}>
                                        {totalBobotCpl[cpl.id_cpl] || 0}
                                    </StyledTableCell>
                                ))}
                                {/* Menampilkan total bobot_cpl dari semua semester */}
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
                                            // Tambahkan warna tambahan jika diperlukan
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(255, 159, 64, 0.2)',
                                            // Tambahkan warna garis tambahan jika diperlukan
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
                                        display: isDataAvailable ? true : false, // Tampilkan label hanya jika data tersedia
                                        formatter: (value, context) => {
                                            return isDataAvailable ? selectedBobotCPL[context.dataIndex] : ''; // Kosongkan nilai jika data tidak tersedia
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
                <br /><br /><br />
            </div>
            <FooterComponent />
        </>
    );
};

export default PencapaianMhs;
