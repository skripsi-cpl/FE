import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavbarComponent, FooterComponent, BackButton, BreadCrumbComponents, ModalEditPL, ModalEditCPL, ModalEditCPMK, ModalEditMK } from "../../Components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "./MasterData.css";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));



const contentDatacpmk = [
    { field1: "312", field2: "12332", field3: "21312 ", field4: "Konten nama", field5: "Konten nama" },
    { field1: "312", field2: "12332", field3: "21312 ", field4: "Konten nama", field5: "Konten nama" },
    { field1: "312", field2: "12332", field3: "21312 ", field4: "Konten nama", field5: "Konten nama" },
];
const contentDatamk = [
    { field1: "312", field2: "12332", field3: "21312 ", field4: "312312", field5: "Konten nama" },
    { field1: "312", field2: "12332", field3: "21312 ", field4: "312312", field5: "Konten nama" },
    { field1: "312", field2: "12332", field3: "21312 ", field4: "312312", field5: "Konten nama" },
    { field1: "312", field2: "12332", field3: "21312 ", field4: "312312", field5: "Konten nama" },
];

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 2 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const deleteData = () => {
    confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do this.',
        buttons: [
            {
                label: 'Yes',
                onClick: () => alert('Click Yes')
            },
            {
                label: 'No',
                onClick: () => alert('Click No')
            }
        ]
    });
};


const MasterDataPage = () => {

    const [value, setValue] = React.useState(0);
    const [isModalOpenPL, setIsModalOpenPL] = useState(false);
    const [isModalOpenCPL, setIsModalOpenCPL] = useState(false);
    const [isModalOpenCPMK, setIsModalOpenCPMK] = useState(false);
    const [isModalOpenMK, setIsModalOpenMK] = useState(false);

    const [contentDataPL, setContentDataPL] = useState([]);
    const [contentDatacpl, setContentDataCPL] = useState([]);
    const [contentDatacpmk, setContentDataCPMK] = useState([]);
    const [contentDatamk, setContentDataMK] = useState([]);

    useEffect(() => {
        const fetchDataPL = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/datapl');
                // Assuming response.data is an array of objects with field1, field2, and field3 properties
                setContentDataPL(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataPL();
    }, []);

    useEffect(() => {
        const fetchDataPL = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/datacpl');
                // Assuming response.data is an array of objects with field1, field2, and field3 properties
                setContentDataCPL(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataPL();
    }, []);

    useEffect(() => {
        const fetchDataPL = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/datacpmk');
                // Assuming response.data is an array of objects with field1, field2, and field3 properties
                setContentDataCPMK(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataPL();
    }, []);

    useEffect(() => {
        const fetchDataPL = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/datamk');
                // Assuming response.data is an array of objects with field1, field2, and field3 properties
                setContentDataMK(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchDataPL();
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const openModalPL = () => {
        setIsModalOpenPL(true);
    };

    const closeModalPL = () => {
        setIsModalOpenPL(false);
    };

    const openModalCPL = () => {
        setIsModalOpenCPL(true);
    }

    const closeModalCPL = () => {
        setIsModalOpenCPL(false);
    }

    const openModalCPMK = () => {
        setIsModalOpenCPMK(true);
    }

    const closeModalCPMK = () => {
        setIsModalOpenCPMK(false);
    }

    const openModalMK = () => {
        setIsModalOpenMK(true);
    }

    const closeModalMK = () => {
        setIsModalOpenMK(false);
    }


    return (
        <>
            <NavbarComponent />

            <div className="container-master-data">
                <div className="header-all-content">
                    <BackButton />
                    <BreadCrumbComponents />
                </div>
                <div className="master-data-container">
                    <h1>Master Data</h1>
                    <div className="master-data-content">
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="PL" {...a11yProps(0)} />
                                <Tab label="CPL" {...a11yProps(1)} />
                                <Tab label="CPMK" {...a11yProps(2)} />
                                <Tab label="MK" {...a11yProps(3)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <div className="master-data-tab-content">
                                <div className="master-data-tab-content-left">
                                    <h2>Profil Lulusan</h2>
                                    <hr
                                        style={{
                                            color: '#000000',
                                            backgroundColor: '#000000',
                                            height: 1
                                        }}
                                    />

                                    <form action="">
                                        <h3>Cari Profil Lulusan</h3>
                                        <input type="text" />
                                    </form>
                                </div>

                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Kode Profil Lulusan</StyledTableCell>
                                                <StyledTableCell>Nama Profil Lulusan</StyledTableCell>
                                                <StyledTableCell>Botot Profil Lulusan</StyledTableCell>
                                                <StyledTableCell>Action</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {contentDataPL.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{row.id_pl}</TableCell>
                                                    <TableCell>{row.nama_pl}</TableCell>
                                                    <TableCell>{row.bobot_pl}</TableCell>
                                                    <TableCell className="button-action-operator">
                                                        <button className="buttonedit" onClick={openModalPL}>Edit</button>
                                                        <button className="buttondelete" onClick={deleteData}>Delete</button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <div className="master-data-tab-content">
                                <div className="master-data-tab-content-left">
                                    <h2>Capaian Pembelajaran Lulusan</h2>
                                    <hr
                                        style={{
                                            color: '#000000',
                                            backgroundColor: '#000000',
                                            height: 1
                                        }}
                                    />

                                    <form action="">
                                        <h3>Cari Capaian Pembelajaran Lulusan</h3>
                                        <input type="text" />
                                    </form>
                                </div>

                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Kode Profile Lulusan</StyledTableCell>
                                                <StyledTableCell>Kode Capaian Pembelajaran Lulusan</StyledTableCell>
                                                <StyledTableCell>Nama Capaian Pembelajaran Lulusan</StyledTableCell>
                                                <StyledTableCell>Botot Capaian Pembelajaran Lulusan</StyledTableCell>
                                                <StyledTableCell>Action</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {contentDatacpl.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{row.id_pl}</TableCell>
                                                    <TableCell>{row.id_cpl}</TableCell>
                                                    <TableCell>{row.nama_cpl}</TableCell>
                                                    <TableCell>{row.bobot_cpl}</TableCell>
                                                    <TableCell className="button-action-operator">
                                                        <button className="buttonedit" onClick={openModalCPL}>Edit</button>
                                                        <button className="buttondelete" onClick={deleteData}>Delete</button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <div className="master-data-tab-content">
                                <div className="master-data-tab-content-left">
                                    <h2>Capaian Pembelajaran Mata Kuliah</h2>
                                    <hr
                                        style={{
                                            color: '#000000',
                                            backgroundColor: '#000000',
                                            height: 1
                                        }}
                                    />

                                    <form action="">
                                        <h3>Cari Capaian Pembelajaran Mata Kuliah</h3>
                                        <input type="text" />
                                    </form>
                                </div>

                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Kode Capaian Pembelajaran Lulusan</StyledTableCell>
                                                <StyledTableCell>Kode Capaian Pembelajaran Mata Kuliah</StyledTableCell>
                                                <StyledTableCell>Nama Capaian Pembelajaran Lulusan</StyledTableCell>
                                                <StyledTableCell>Nama Capaian Pembelajaran Mata Kuliah</StyledTableCell>
                                                <StyledTableCell>Botot Capaian Pembelajaran Mata Kuliah</StyledTableCell>
                                                <StyledTableCell>Action</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {contentDatacpmk.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{row.id_cpl}</TableCell>
                                                    <TableCell>{row.id_cpmk}</TableCell>
                                                    <TableCell>{row.nama_cpl}</TableCell>
                                                    <TableCell>{row.nama_cpmk}</TableCell>
                                                    <TableCell>{row.bobot_cpmk}</TableCell>
                                                    <TableCell className="button-action-operator">
                                                        <button className="buttonedit" onClick={openModalCPMK}>Edit</button>
                                                        <button className="buttondelete" onClick={deleteData}>Delete</button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3}>
                            <div className="master-data-tab-content">
                                <div className="master-data-tab-content-left">
                                    <h2>Mata Kuliah</h2>
                                    <hr
                                        style={{
                                            color: '#000000',
                                            backgroundColor: '#000000',
                                            height: 1
                                        }}
                                    />

                                    <form action="">
                                        <h3>Cari Mata Kuliah</h3>
                                        <input type="text" />
                                    </form>
                                </div>

                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Kode Capaian Pembelajaran</StyledTableCell>
                                                <StyledTableCell>Kode Capaian Pembelajaran Mata Kuliah</StyledTableCell>
                                                <StyledTableCell>Kode Mata Kuliah</StyledTableCell>
                                                <StyledTableCell>Nama Mata Kuliah</StyledTableCell>
                                                <StyledTableCell>Botot Mata Kuliah</StyledTableCell>
                                                <StyledTableCell>Action</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {contentDatamk.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{row.id_cpmk_mk}</TableCell>
                                                    <TableCell>{row.id_cpmk}</TableCell>
                                                    <TableCell>{row.id_mk}</TableCell>
                                                    <TableCell>{row.nama_mk}</TableCell>
                                                    <TableCell>{row.bobot_mk}</TableCell>
                                                    <TableCell className="button-action-operator">
                                                        <button className="buttonedit" onClick={openModalMK}>Edit</button>
                                                        <button className="buttondelete" onClick={deleteData}>Delete</button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </CustomTabPanel>
                    </div>
                </div>
                <ModalEditPL isOpen={isModalOpenPL} onClose={closeModalPL} />
                <ModalEditCPL isOpen={isModalOpenCPL} onClose={closeModalCPL} />
                <ModalEditCPMK isOpen={isModalOpenCPMK} onClose={closeModalCPMK} />
                <ModalEditMK isOpen={isModalOpenMK} onClose={closeModalMK} />
            </div>
            <FooterComponent />
            <ToastContainer />
        </>
    );
}

export default MasterDataPage;
