import React, { useState, useEffect } from "react";
import { NavbarComponent, FooterComponent, BackButton, BreadCrumbComponents, ModalEditPL, ModalEditCPL, ModalEditCPMK,ModalEditMK } from "../../Components";
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

    const deleteDataPL = (id_pl) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(`http://localhost:8000/api/datadeletepl/${id_pl.toString().padStart(2, '0')}`, {
                            method: 'DELETE'
                        })
                            .then(response => {
                                if (response.ok) {
                                    // Memuat ulang data setelah penghapusan berhasil
                                    fetch("http://localhost:8000/api/datapl")
                                        .then(response => response.json())
                                        .then(data => {
                                            // Memperbarui data yang ditampilkan
                                            setPlData(data);
                                        })
                                        .catch(error => {
                                            console.error('Error fetching data:', error);
                                        });
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
                    label: 'No'
                }
            ]
        });
    };

    const deleteDataCPL = (id_cpl) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(`http://localhost:8000/api/datadeletecpl/${id_cpl.toString().padStart(5, '0')}`, {
                            method: 'DELETE'
                        })
                            .then(response => {
                                if (response.ok) {
                                    // Memuat ulang data setelah penghapusan berhasil
                                    fetch("http://localhost:8000/api/datacpl")
                                        .then(response => response.json())
                                        .then(data => {
                                            // Memperbarui data yang ditampilkan
                                            setCplData(data);
                                        })
                                        .catch(error => {
                                            console.error('Error fetching data:', error);
                                        });
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
                    label: 'No'
                }
            ]
        });
    };
    const deleteDataCPMK = (id_cpmk) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(`http://localhost:8000/api/datadeletecpmk/${id_cpmk.toString().padStart(7, '0')}`, {
                            method: 'DELETE'
                        })
                            .then(response => {
                                if (response.ok) {
                                    // Memuat ulang data setelah penghapusan berhasil
                                    fetch("http://localhost:8000/api/datacpmk")
                                        .then(response => response.json())
                                        .then(data => {
                                            // Memperbarui data yang ditampilkan
                                            setCpmkData(data);
                                        })
                                        .catch(error => {
                                            console.error('Error fetching data:', error);
                                        });
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
                    label: 'No'
                }
            ]
        });
    };
    const deleteDataCPMKMK = (id_cpmk_mk) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(`http://localhost:8000/api/datadeletecpmkmk/${id_cpmk_mk.toString().padStart(10, '0')}`, {
                            method: 'DELETE'
                        })
                            .then(response => {
                                if (response.ok) {
                                    // Memuat ulang data setelah penghapusan berhasil
                                    fetch("http://localhost:8000/api/datamk")
                                        .then(response => response.json())
                                        .then(data => {
                                            // Memperbarui data yang ditampilkan
                                            setCpmkMkData(data);
                                        })
                                        .catch(error => {
                                            console.error('Error fetching data:', error);
                                        });
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
                    label: 'No'
                }
            ]
        });
    };
    useEffect(() => {
        // Lakukan pengambilan data dari API saat komponen dimuat
        fetch("http://localhost:8000/api/datapl")
            .then(response => response.json())
            .then(data => {
                // Simpan data yang diterima ke dalam state
                setPlData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        // Lakukan pengambilan data dari API saat komponen dimuat
        fetch("http://localhost:8000/api/datacpl")
            .then(response => response.json())
            .then(data => {
                // Simpan data yang diterima ke dalam state
                setCplData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    useEffect(() => {
        // Lakukan pengambilan data dari API saat komponen dimuat
        fetch("http://localhost:8000/api/datacpmk")
            .then(response => response.json())
            .then(data => {
                // Simpan data yang diterima ke dalam state
                setCpmkData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    useEffect(() => {
        // Lakukan pengambilan data dari API saat komponen dimuat
        fetch("http://localhost:8000/api/datamk")
            .then(response => response.json())
            .then(data => {
                // Simpan data yang diterima ke dalam state
                setCpmkMkData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    const [value, setValue] = React.useState(0);
    const [isModalOpenPL, setIsModalOpenPL] = useState(false);
    const [isModalOpenCPL, setIsModalOpenCPL] = useState(false);
    const [isModalOpenCPMK, setIsModalOpenCPMK] = useState(false);
    const [isModalOpenMK, setIsModalOpenMK] = useState(false);
    const [plData, setPlData] = useState([]);
    const [cplData, setCplData] = useState([]);
    const [cpmkData, setCpmkData] = useState([]);
    const [cpmkmkData, setCpmkMkData] = useState([]);

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
                                                <StyledTableCell>Bobot Profil Lulusan</StyledTableCell>
                                                <StyledTableCell>Action</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* Gunakan data dari API untuk mengisi baris tabel */}
                                            {plData.map((row, index) => (
                                                <TableRow key={index}>
                                                    {/* Sesuaikan sel dengan properti yang ada pada data dari API */}
                                                    <TableCell>{row.id_pl.toString().padStart(2, '0')}</TableCell>
                                                    <TableCell>{row.nama_pl}</TableCell>
                                                    <TableCell>{row.bobot_pl}</TableCell>
                                                    <TableCell className="button-action-operator">
                                                        <button className="buttonedit" onClick={openModalPL}>Edit</button>
                                                        <button className="buttondelete" onClick={() => deleteDataPL(row.id_pl.toString())}>Delete</button>
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
                                                <StyledTableCell>Kode Capaian Pembelajaran Lulusan</StyledTableCell>
                                                <StyledTableCell>Nama Capaian Pembelajaran Lulusan</StyledTableCell>
                                                <StyledTableCell>Bobot Capaian Pembelajaran Lulusan</StyledTableCell>
                                                <StyledTableCell>Action</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* Gunakan data dari API untuk mengisi baris tabel */}
                                            {cplData.map((row, index) => (
                                                <TableRow key={index}>
                                                    {/* Sesuaikan sel dengan properti yang ada pada data dari API */}
                                                    <TableCell>{row.id_cpl.toString().padStart(5, '0')}</TableCell>
                                                    <TableCell>{row.nama_cpl}</TableCell>
                                                    <TableCell>{row.bobot_cpl}</TableCell>
                                                    <TableCell className="button-action-operator">
                                                        <button className="buttonedit" onClick={openModalCPL}>Edit</button>
                                                        <button className="buttondelete" onClick={() => deleteDataCPL(row.id_cpl.toString())}>Delete</button>
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
                                                <StyledTableCell>Kode Capaian Pembelajaran Mata Kuliah</StyledTableCell>
                                                <StyledTableCell>Nama Capaian Pembelajaran Mata Kuliah</StyledTableCell>
                                                <StyledTableCell>Bobot Capaian Pembelajaran Mata Kuliah</StyledTableCell>
                                                <StyledTableCell>Action</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* Gunakan data dari API untuk mengisi baris tabel */}
                                            {cpmkData.map((row, index) => (
                                                <TableRow key={index}>
                                                    {/* Sesuaikan sel dengan properti yang ada pada data dari API */}
                                                    <TableCell>{row.id_cpmk.toString().padStart(7, '0')}</TableCell>
                                                    <TableCell>{row.nama_cpmk}</TableCell>
                                                    <TableCell>{row.bobot_cpmk}</TableCell>
                                                    <TableCell className="button-action-operator">
                                                        <button className="buttonedit" onClick={openModalCPMK}>Edit</button>
                                                        <button className="buttondelete" onClick={() => deleteDataCPMK(row.id_cpmk.toString())}>Delete</button>
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
                                                <StyledTableCell>ID Mata Kuliah</StyledTableCell>
                                                <StyledTableCell>Kode Mata Kuliah</StyledTableCell>
                                                <StyledTableCell>Nama Mata Kuliah</StyledTableCell>
                                                <StyledTableCell>Bobot Mata Kuliah</StyledTableCell>
                                                <StyledTableCell>Action</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* Gunakan data dari API untuk mengisi baris tabel */}
                                            {cpmkmkData.map((row, index) => (
                                                <TableRow key={index}>
                                                    {/* Sesuaikan sel dengan properti yang ada pada data dari API */}
                                                    <TableCell>{row.id_cpmk_mk.toString().padStart(10, '0')}</TableCell>
                                                    <TableCell>{row.kode_mk}</TableCell>
                                                    <TableCell>{row.nama_mk}</TableCell>
                                                    <TableCell>{row.bobot_mk}</TableCell>
                                                    <TableCell className="button-action-operator">
                                                        <button className="buttonedit" onClick={openModalMK}>Edit</button>
                                                        <button className="buttondelete" onClick={() => deleteDataCPMKMK(row.id_cpmk_mk.toString())}>Delete</button>
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
