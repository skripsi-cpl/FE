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

const ModalInputTahunAjaran = () => {
    const [open, setOpen] = React.useState(false);
    const [tahunAjaranOptions, setTahunAjaranOptions] = useState([]);
    const [formDataKurikulum, setFormDataKurikulum] = useState({
        id_kurikulum: '',
        nama_kurikulum: '',
    });
    const [formDataTahunAjaran, setFormDataTahunAjaran] = useState({
        keterangan: '',
        tahun:'',
    });



    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    

   
   
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataKurikulum({
            ...formDataKurikulum,
            [name]: value,
        });
        setFormDataTahunAjaran({
            ...formDataTahunAjaran,
            [name]: value,
        });
        
    };
    useEffect(() => {
        const fetchTahunAjaranOptions = async () => {
            try {
                const response = await Axios.get('http://localhost:8000/api/tahun-ajaran');
                setTahunAjaranOptions(response.data);
            } catch (error) {
                console.error('Error fetching tahun ajaran:', error);
            }
        };

        fetchTahunAjaranOptions();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const validationError = {};
        // if (!formDataKurikulum.id_kurikulum.trim()) {
        //     validationError.id_kurikulum = 'ID cpmk harus diisi';
        // }
        
        try {
            // Format periode berdasarkan pilihan yang dipilih
            const semester = formDataTahunAjaran.keterangan === 'Genap' ? 'Genap' : 'Ganjil';
            const tahun = formDataTahunAjaran.tahun;
            const periode = `Semester ${semester} Tahun ${tahun}`;

            // Mengirimkan data dengan periode yang diformat
            await Axios.post('http://localhost:8000/api/datapostta', { periode });
            await Axios.post('http://localhost:8000/api/datapostkurikulum', formDataKurikulum);
            toast.success("Data Tahun Ajaran berhasil disimpan", {
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
            toast.error("Data Tahun Ajaran gagal disimpan", {
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
        // setError(validationError);
        console.log("Data Kurikulum:", formDataKurikulum);
        console.log("Data Tahun Ajaran:", formDataTahunAjaran);
    };

    return (
        <div className='modal-box'>
            <Button onClick={handleOpen}>Isi Data Tahun Ajaran </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="header-modal">
                        <Typography id="modal-modal-title" variant="h4" component="h2">
                            Masukkan data Tahun Ajaran
                        </Typography>
                        <Button onClick={handleClose}>X</Button>
                    </div>
                    <form onSubmit={handleSubmit}>
                    <div className="content-input">

                            <label>
                                Keterangan
                                <select name="keterangan" onChange={handleChange}>
                                    <option value="Genap">Genap</option>
                                    <option value="Ganjil">Ganjil</option>
                                </select>
                            </label>
                            <label>
                                Tahun
                                <select name="tahun" onChange={handleChange}>
                                    {tahunAjaranOptions.map((tahun) => (
                                        <option key={tahun} value={tahun}>{tahun}</option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                ID Kurikulum
                                <input
                                    type='text'
                                    value={formDataKurikulum.id_kurikulum}
                                    onChange={handleChange}
                                    name='id_kurikulum'
                                />
                            </label>
                            <label>
                                Nama Kurikulum
                                <input
                                    type='text'
                                    value={formDataKurikulum.nama_kurikulum}
                                    onChange={handleChange}
                                    name='nama_kurikulum'
                                />
                            </label>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalInputTahunAjaran;
