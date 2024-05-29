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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

    const [selectedPL, setSelectedPL] = useState(null);
    const [selectedCPL, setSelectedCPL] = useState(null);
    const [selectedCPMK, setSelectedCPMK] = useState(null);
    const [selectedMK, setSelectedMK] = useState(null);

    useEffect(() => {
        const fetchDataPL = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/datapl');
                setContentDataPL(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataPL();
    }, []);

    useEffect(() => {
        const fetchDataCPL = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/datacpl');
                setContentDataCPL(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataCPL();
    }, []);

    useEffect(() => {
        const fetchDataCPMK = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/datacpmk');
                setContentDataCPMK(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataCPMK();
    }, []);

    useEffect(() => {
        const fetchDataMK = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/datamk');
                setContentDataMK(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchDataMK();
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const openModalPL = (pl) => {
        setSelectedPL(pl);
        setIsModalOpenPL(true);
    };

    const closeModalPL = () => {
        setIsModalOpenPL(false);
    };

    const openModalCPL = (cpl) => {
        setSelectedCPL(cpl);
        setIsModalOpenCPL(true);
    }

    const closeModalCPL = () => {
        setIsModalOpenCPL(false);
    }

    const openModalCPMK = (cpmk) => {
        setSelectedCPMK(cpmk);
        setIsModalOpenCPMK(true);
    }

    const closeModalCPMK = () => {
        setIsModalOpenCPMK(false);
    }

    const openModalMK = (mk) => {
        setSelectedMK(mk);
        setIsModalOpenMK(true);
    }

    const closeModalMK = () => {
        setIsModalOpenMK(false);
    }

    const deleteDataPL = (datapl) => {
        const { id_pl } = datapl;
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this data?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(`http://localhost:8000/api/datadeletepl/${id_pl}`, {
                            method: 'DELETE'
                        })
                            .then(response => {
                                if (response.ok) {
                                    toast.success('Data berhasil dihapus');
                                    window.location.reload();
                                    onClose();
                                } else {
                                    throw new Error('Failed to delete data');
                                }
                            })
                            .catch(error => {
                                console.error('Error deleting data:', error);
                            });
                    }
                },
                {
                    label: 'No',
                    onClick: () => alert('Data tidak dihapus')
                }
            ]
        });
    };
    const deleteDataCPL = (datacpl) => {
        const { id_cpl } = datacpl;
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this data?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(`http://localhost:8000/api/datadeletecpl/${id_cpl}`, {
                            method: 'DELETE'
                        })
                            .then(response => {
                                if (response.ok) {
                                    toast.success('Data berhasil dihapus');
                                    window.location.reload();
                                    onClose();
                                } else {
                                    throw new Error('Failed to delete data');
                                }
                            })
                            .catch(error => {
                                console.error('Error deleting data:', error);
                            });
                    }
                },
                {
                    label: 'No',
                    onClick: () => alert('Data tidak dihapus')
                }
            ]
        });
    };
    const deleteDataCPMK = (datacpmk) => {
        const { id_cpmk } = datacpmk;
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this data?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(`http://localhost:8000/api/datadeletecpmk/${id_cpmk}`, {
                            method: 'DELETE'
                        })
                            .then(response => {
                                if (response.ok) {
                                    toast.success('Data berhasil dihapus');
                                    window.location.reload();
                                    onClose();
                                } else {
                                    throw new Error('Failed to delete data');
                                }
                            })
                            .catch(error => {
                                console.error('Error deleting data:', error);
                            });
                    }
                },
                {
                    label: 'No',
                    onClick: () => alert('Data tidak dihapus')
                }
            ]
        });
    };
    const deleteDataMK = (datamk) => {
        const { id_mk } = datamk;
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this data?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(`http://localhost:8000/api/datadeletecpmkmk/${id_mk}`, {
                            method: 'DELETE'
                        })
                            .then(response => {
                                if (response.ok) {
                                    toast.success('Data berhasil dihapus');
                                    window.location.reload();
                                    onClose();
                                } else {
                                    throw new Error('Failed to delete data');
                                }
                            })
                            .catch(error => {
                                console.error('Error deleting data:', error);
                            });
                    }
                },
                {
                    label: 'No',
                    onClick: () => alert('Data tidak dihapus')
                }
            ]
        });
    };


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
                                </div>

                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Kode Profil Lulusan</StyledTableCell>
                                                <StyledTableCell>Nama Profil Lulusan</StyledTableCell>
                                                <StyledTableCell>Bobot Profil Lulusan</StyledTableCell>
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
                                                        <button className="buttonedit" onClick={() => openModalPL(row)}>Edit</button>
                                                        <button className="buttondelete" onClick={() => deleteDataPL(row)}>Delete</button>
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
                                </div>

                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Kode CPL</StyledTableCell>
                                                <StyledTableCell>Nama CPL</StyledTableCell>
                                                <StyledTableCell>Bobot CPL</StyledTableCell>
                                                <StyledTableCell>Action</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {contentDatacpl.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{row.id_cpl}</TableCell>
                                                    <TableCell>{row.nama_cpl}</TableCell>
                                                    <TableCell>{row.bobot_cpl}</TableCell>
                                                    <TableCell className="button-action-operator">
                                                        <button className="buttonedit" onClick={() => openModalCPL(row)}>Edit</button>
                                                        <button className="buttondelete" onClick={() => deleteDataCPL(row)}>Delete</button>
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
                                    <h2>Capaian Pembelajaran Matakuliah</h2>
                                    <hr
                                        style={{
                                            color: '#000000',
                                            backgroundColor: '#000000',
                                            height: 1
                                        }}
                                    />
                                </div>

                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Kode CPMK</StyledTableCell>
                                                <StyledTableCell>Nama CPMK</StyledTableCell>
                                                <StyledTableCell>Bobot CPMK</StyledTableCell>
                                                <StyledTableCell>Action</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {contentDatacpmk.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{row.id_cpmk}</TableCell>
                                                    <TableCell>{row.nama_cpmk}</TableCell>
                                                    <TableCell>{row.bobot_cpmk}</TableCell>
                                                    <TableCell className="button-action-operator">
                                                        <button className="buttonedit" onClick={() => openModalCPMK(row)}>Edit</button>
                                                        <button className="buttondelete" onClick={() => deleteDataCPMK(row)}>Delete</button>
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
                                </div>

                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Kode MK</StyledTableCell>
                                                <StyledTableCell>Nama MK</StyledTableCell>
                                                <StyledTableCell>Bobot MK</StyledTableCell>
                                                <StyledTableCell>Action</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {contentDatamk.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{row.id_mk}</TableCell>
                                                    <TableCell>{row.nama_mk}</TableCell>
                                                    <TableCell>{row.bobot_mk}</TableCell>
                                                    <TableCell className="button-action-operator">
                                                        <button className="buttonedit" onClick={() => openModalMK(row)}>Edit</button>
                                                        <button className="buttondelete" onClick={() => deleteDataMK(row)}>Delete</button>
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
            </div>
            {selectedPL && (
                <ModalEditPL
                    isOpen={isModalOpenPL}
                    onClose={closeModalPL}
                    datapl={selectedPL}
                />
            )}
            <ModalEditCPL
                isOpen={isModalOpenCPL}
                onClose={closeModalCPL}
                datacpl={selectedCPL}
            />
            <ModalEditCPMK
                isOpen={isModalOpenCPMK}
                onClose={closeModalCPMK}
                datacpmk={selectedCPMK}
            />
            <ModalEditMK
                isOpen={isModalOpenMK}
                onClose={closeModalMK}
                datamk={selectedMK}
            />
            <ToastContainer />
            <FooterComponent />
        </>
    );
};

export default MasterDataPage;
