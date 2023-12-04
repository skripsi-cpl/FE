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
    const [dataPL, setDataPL] = useState([])
    const [error, setError] = useState({});
    const [formData, setFormData] = useState({
        id_cpl: '',
        nama_cpl: '',
        bobot_cpl: '',
        id_pl: '',
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {

    };

    const handleSubmit = async (e) => {

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
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalMataKuliah;
