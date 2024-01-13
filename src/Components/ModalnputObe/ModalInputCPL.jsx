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

const ModalInputCPL = () => {
    const [open, setOpen] = React.useState(false);
    const [dataPL, setDataPL] = useState([])
    const [dataCPL, setDataCPL] = useState([])
    const [error, setError] = useState({});
    const [getTotalBobotCPL, setGetTotalBobotCPL] = useState(0);
    const [formData, setFormData] = useState({
        id_cpl: '',
        nama_cpl: '',
        bobot_cpl: '',
        id_pl: '',
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = {};
        if (!formData.id_pl.trim()) {
            validationError.id_pl = 'ID PL harus diisi';
        }
        if (!formData.id_cpl.trim()) {
            validationError.id_cpl = 'ID CPL harus diisi';
        } else if (formData.id_cpl.length > 3) {
            validationError.id_cpl = 'ID CPL harus kurang dari 3 karakter';
        }
        if (!formData.nama_cpl) {
            validationError.nama_cpl = 'Nama CPL harus diisi';
        }
        if (!formData.bobot_cpl) {
            validationError.bobot_cpl = 'Bobot CPL harus diisi';
        } else if (formData.bobot_cpl > 1) {
            validationError.bobot_cpl = 'Bobot CPL tidak boleh lebih dari 1';
        }
        
        setError(validationError);
        if (Object.keys(validationError).length > 0) return;
        
        
        
    
        // Hitung total bobot CPL yang akan ditambahkan
        const newBobotCPL = parseFloat(formData.bobot_cpl || 0);
        
        // Jika jumlah total melebihi 1, tampilkan pesan error
        if (getTotalBobotCPL + newBobotCPL > 1) {
            validationError.bobot_cpl = 'Jumlah bobot CPL maksimal 1';
            setError(validationError);
            return;
        }
        

        try {
            await Axios.post('http://localhost:8000/api/datapostcpl', formData);
            toast.success("Data CPL posted successfully", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setFormData({
                id_cpl: '',
                nama_cpl: '',
                bobot_cpl: '',
                id_pl: '',
            });
            handleClose();
        } catch (error) {
            toast.error("Data CPL failed to post", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.error('Error posting data:', error);
        }
    };


    useEffect(() => {
        const fetchDataPL = async () => {
            try {
                const response = await Axios.get("http://localhost:8000/api/datapl");
                setDataPL(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDataPL();
    }, []);
    useEffect(() => {
        const fetchdataCPL = async () => {
            try {
                const response = await Axios.get("http://localhost:8000/api/datacpl");
                setDataCPL(response.data.bobot_cpl);
                // Menampilkan nilai bobot_cpl saja
                
                const totalBobotCPL = response.data.reduce((total, item) => {
                    return total + parseFloat(item.bobot_cpl || 0);
                }, 0);
                setGetTotalBobotCPL(totalBobotCPL)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchdataCPL();
    }, []);


    return (
        <div className='modal-box'>
            <Button onClick={handleOpen}>Isi Data Capaian Pembelajaran Lulusan (CPL) </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="header-modal">
                        <Typography id="modal-modal-title" variant="h4" component="h2">
                            Masukkan data Capaian Pembelajaran Lulusan (CPL)
                        </Typography>
                        <Button onClick={handleClose}>X</Button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="content-input">
                            <label>
                                Kode Profile Lulusan
                                <select
                                    value={formData.id_pl}
                                    onChange={handleChange}
                                    name="id_pl"
                                >
                                    <option value="">Pilih Kode PL</option>
                                    {dataPL.map((item) => (
                                        <option
                                            key={item.id_pl} value={item.id_pl}>
                                            {item.id_pl} - {item.nama_pl}
                                        </option>
                                    ))}
                                </select>
                                {error.id_pl && <p className="error">{error.id_pl}</p>}
                            </label>

                            <label>
                                Kode Capaian Pembelajaran Lulusan
                                <input
                                    type="text"
                                    value={formData.id_cpl}
                                    onChange={handleChange}
                                    name="id_cpl"
                                />
                                {error.id_cpl && <p className="error">{error.id_cpl}</p>}
                            </label>
                            <label>
                                Nama Capaian Pembelajaran Lulusan
                                <input
                                    type="text"
                                    value={formData.nama_cpl}
                                    onChange={handleChange}
                                    name="nama_cpl"
                                />
                                {error.nama_cpl && <p className="error">{error.nama_cpl}</p>}
                            </label>
                            <label>
                                Bobot Capaian Pembelajaran Lulusan
                                <input
                                    type="text"
                                    value={formData.bobot_cpl}
                                    onChange={handleChange}
                                    name="bobot_cpl"
                                />
                                {error.bobot_cpl && <p className="error">{error.bobot_cpl}</p>}
                            </label>
                            <button type="submit">Submit</button>
                        </div>

                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalInputCPL;
