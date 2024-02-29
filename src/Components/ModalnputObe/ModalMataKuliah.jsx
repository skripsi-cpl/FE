import * as React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './modal.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 5,
};

const ModalMataKuliah = () => {
    const [open, setOpen] = React.useState(false);
    const [dataCPMK, setdataCPMK] = useState([])
    const [dataMK, setdataMK] = useState([])
    const [dataMataKuliah, setdataMataKuliah] = useState([])
    const [error, setError] = useState({});
    const [formData, setFormData] = useState({
        id_cpmk: '',
        id_mk: '',
        bobot_mk: '',
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        const fetchDataCPMK = async () => {
            try {
                const response = await Axios.get("http://localhost:8000/api/datacpmk");
                setdataCPMK(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDataCPMK();
    }, []);

    useEffect(() => {
        const fetchDataMataKuliah = async () => {
            try {
                const response = await Axios.get("http://localhost:8000/api/datamatakuliah");
                setdataMataKuliah(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDataMataKuliah();
    }, []);

    useEffect(() => {
        const fetchDataMK = async () => {
            try {
                const response = await Axios.get("http://localhost:8000/api/datamk");
                setdataMK(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDataMK();
    }, []);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        
        if (name === 'id_mk' && !formData.id_cpmk) {
            
            // Atau tampilkan pesan error di tempat yang sesuai di halaman Anda
            // Misalnya, Anda bisa menetapkan error pada state 'error' dan menampilkannya dalam elemen JSX
            // setErrors({ ...errors, id_mk: 'Mohon untuk memilih kode CPMK terlebih dahulu' });
            // Kemudian, tampilkan pesan error ini di tempat yang sesuai dalam render JSX Anda
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = {};
        if (!formData.id_cpmk.trim()) {
            validationError.id_cpmk = 'ID cpmk harus diisi';
        }
        if (!formData.id_mk.trim()) {
            validationError.id_mk = 'ID mk harus diisi';
        }
        if (!formData.bobot_mk) {
            validationError.bobot_mk = 'Bobot MK harus diisi';
        }
        //else if (formData.bobot_mk > 100) {
        //     validationError.bobot_mk = 'Bobot CPMK tidak boleh lebih dari 1';
        // }

        setError(validationError);

        // if (Object.keys(validationError).length > 0) return;
        // const selectedCPMK = dataCPMK.find((item) => item.id_cpmk === formData.id_cpmk);
        // const selectedBobotCPMK = selectedCPMK ? parseFloat(selectedCPMK.bobot_cpmk || 0) : 0;
        // // // Hitung total bobot CPMK yang akan ditambahkan
        // const newBobotMK = parseFloat(formData.bobot_mk || 0);
        
        
        // if (newBobotMK > selectedBobotCPMK) {
        //     validationError.bobot_mk = "Bobot MK tidak boleh lebih besar dari bobot CPMK yang dipilih";
        //     setError(validationError);
        //     return;
        // }
        // const totalBobotMKForCPMK = dataMK.reduce((total, item) => {
        //     if (item.id_cpmk === formData.id_cpmk) {
        //         return total + parseFloat(item.bobot_mk || 0);
        //     }
        //     return total;
        // }, 0);
        
        // const totalAllBobot = totalBobotMKForCPMK + newBobotMK
        // console.log(totalAllBobot)
        // if (totalAllBobot > selectedBobotCPMK) {
        //     validationError.bobot_mk = "Jumlah bobot MK tidak boleh melebihi bobot CPL yang dipilih";
        //     setError(validationError);
        //     return;
        // }
       
        


        

        try {
            await Axios.post('http://localhost:8000/api/datapostmk', formData);
            toast.success("Data MK posted successfully", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            handleClose();
            window.location.reload();
        } catch (error) {
            toast.error("Data MK failed to post", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(error);
        }
    };

    return (
        <div className='modal-box'>
            <Button onClick={handleOpen}>Isi Data Mata Kuliah </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="header-modal">
                        <Typography id="modal-modal-title" variant="h4" component="h2">
                            Masukkan data Mata Kuliah
                        </Typography>
                        <Button onClick={handleClose}>X</Button>
                    </div>
                    <form onSubmit={handleSubmit}>
                    <div className="content-input">
                            <label>
                                Kode Capaian Pembelajaran 

                                <select
                                    disabled
                                    value={formData.id_cpmk}
                                    onChange={(e) => {
                                        handleChange(e);
                                        const selectedIdCpmk = e.target.value;
                                        const correspondingItem = dataCPMK.find(item => item.id_cpmk === selectedIdCpmk);
                                    }}
                                >
                                    <option value="">Data Capaian Pembelajaran</option>
                                    {dataCPMK.map((item) => (
                                        <option key={item.id_cpmk} value={item.id_cpmk} disabled>
                                            {item.id_cpl} - {item.nama_cpl}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Kode Capaian Pembelajaran Mata Kuliah
                                <select
                                    value={formData.id_cpmk}
                                    onChange={handleChange}
                                    name="id_cpmk"
                                >
                                    <option value="">Pilih Kode CPMK</option>
                                    {dataCPMK.map((item) => (
                                        <option key={item.id_cpmk} value={item.id_cpmk}>{item.id_cpmk} - {item.nama_cpmk} </option>
                                    ))}
                                </select>
                                {error.id_cpmk && <p className="error">{error.id_cpmk}</p>}
                            </label>
                            <label>
                                Kode Mata Kuliah
                                <select
                                    value={formData.id_mk}
                                    onChange={handleChange}
                                    name="id_mk"
                                >
                                    <option value="">Pilih Kode MK</option>
                                    {dataMataKuliah.map((item) => (
                                        <option key={item.id_mk} value={item.id_mk}>{item.id_mk} - {item.nama_mk} </option>
                                    ))}
                                </select>
                                {error.id_mk && <p className="error">{error.id_mk}</p>}
                            </label>
                            
                            <label>
                                Bobot Mata Kuliah
                                <input
                                    type="text"
                                    value={formData.bobot_mk}
                                    onChange={handleChange}
                                    name="bobot_mk"
                                />
                                {error.bobot_mk && <p className="error">{error.bobot_mk}</p>}
                            </label>
                            
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalMataKuliah;
