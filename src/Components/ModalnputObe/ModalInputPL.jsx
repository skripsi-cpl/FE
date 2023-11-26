import * as React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './modal.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const ModalInputPL = () => {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = useState({});
    const [formData, setFormData] = useState({
        id_pl: '',
        nama_pl: '',
        bobot_pl: '',
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
        } else if (formData.id_pl.length > 3) {
            validationError.id_pl = 'ID PL harus kurang dari 3 karakter';
        }

        if (!formData.nama_pl) {
            validationError.nama_pl = 'Nama PL harus diisi';
        }
        if (!formData.bobot_pl) {
            validationError.bobot_pl = 'Bobot PL harus diisi';
        } else if (formData.bobot_pl > 1) {
            validationError.bobot_pl = 'Bobot PL tidak boleh lebih dari 1';
        }

        setError(validationError);

        if (Object.keys(validationError).length > 0) return;

        try {
            await Axios.post('http://localhost:8000/api/datapostpl', formData);
            toast.success("Data PL posted successfully", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setFormData({
                id_pl: '',
                nama_pl: '',
                bobot_pl: '',
            });
            handleClose();
        } catch (error) {
            toast.error("Data PL failed to post", {
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
        if (open) {
            const fetchDataPL = async () => {
                try {
                    const response = await Axios.get('http://localhost:8000/api/datapl');
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchDataPL();
        }
    }, [open]);

    return (
        <div className='modal-box'>
            <Button onClick={handleOpen}>Isi Data Profil Lulusan (PL) </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <div className='header-modal'>
                        <Typography id='modal-modal-title' variant='h4' component='h2'>
                            Masukkan data Profil Lulusan (PL)
                        </Typography>
                        <Button onClick={handleClose}>X</Button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='content-input'>
                            <label>
                                Kode Profil Lulusan
                                <input
                                    type='text'
                                    value={formData.id_pl}
                                    onChange={handleChange}
                                    name='id_pl'
                                />
                                {error.id_pl && <p className='error'>{error.id_pl}</p>}
                            </label>
                            <label>
                                Nama Profil Lulusan
                                <input
                                    type='text'
                                    value={formData.nama_pl}
                                    onChange={handleChange}
                                    name='nama_pl'
                                />
                                {error.nama_pl && <p className='error'>{error.nama_pl}</p>}
                            </label>
                            <label>
                                Bobot Profil Lulusan
                                <input
                                    type='text'
                                    value={formData.bobot_pl}
                                    onChange={handleChange}
                                    name='bobot_pl'
                                />
                                {error.bobot_pl && <p className='error'>{error.bobot_pl}</p>}
                            </label>
                            <button type='submit'>Submit</button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default ModalInputPL;