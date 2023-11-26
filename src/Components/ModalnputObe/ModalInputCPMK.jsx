import * as React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const ModalInputCPMK = () => {
    const [open, setOpen] = React.useState(false);
    const [dataCPL, setDataCPL, filterData] = useState([]);
    const [error, setError] = useState({});
    const [formData, setFormData] = useState({
        id_cpmk: '',
        nama_cpmk: '',
        bobot_cpmk: '',
        id_cpl: '',
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const fetchDataCPL = async () => {
            try {
                const response = await Axios.get("http://localhost:8000/api/datacpl");
                setDataCPL(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDataCPL();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setValidationError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = {};
        if (!formData.id_cpl.trim()) {
            validationError.id_cpl = 'ID CPL harus diisi';
        }
        if (!formData.id_cpmk.trim()) {
            validationError.id_cpmk = 'ID CPMK harus diisi';
        } else if (formData.id_cpmk.length > 3) {
            validationError.id_cpmk = 'ID CPMK harus kurang dari 3 karakter';
        }
        if (!formData.nama_cpmk) {
            validationError.nama_cpmk = 'Nama CPMK harus diisi';
        }
        if (!formData.bobot_cpmk) {
            validationError.bobot_cpmk = 'Bobot CPMK harus diisi';
        } else if (formData.bobot_cpmk > 1) {
            validationError.bobot_cpmk = 'Bobot CPMK tidak boleh lebih dari 1';
        }

        setError(validationError);

        if (Object.keys(validationError).length > 0) return;

        try {
            await Axios.post('http://localhost:8000/api/datapostcpmk', formData);
            toast.success("Data CPMK posted successfully", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            handleClose();
        } catch (error) {
            toast.error("Data CPMK failed to post", {
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
    }


    return (
        <div className='modal-box'>
            <Button onClick={handleOpen}>Isi Data Capaian Pembelajaran Mata Kuliah (CPMK)</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="header-modal">
                        <Typography id="modal-modal-title" variant="h4" component="h2">
                            Masukkan data Capaian Pembelajaran Mata Kuliah (CPMK)
                        </Typography>
                        <Button onClick={handleClose}>X</Button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="content-input">
                            <label>
                                Kode Profile Lulusan

                                <select
                                    disabled
                                    value={formData.id_cpl}
                                    onChange={(e) => {
                                        handleChange(e);
                                        const selectedIdCpl = e.target.value;
                                        const correspondingItem = dataCPL.find(item => item.id_cpl === selectedIdCpl);
                                    }}
                                >
                                    <option value="">Data Profile Lulusan</option>
                                    {dataCPL.map((item) => (
                                        <option key={item.id_cpl} value={item.id_cpl} disabled>
                                            {item.id_pl} - {item.nama_pl}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Kode Capaian Pembelajaran Lulusan
                                <select
                                    value={formData.id_cpl}
                                    onChange={handleChange}
                                    name="id_cpl"
                                >
                                    <option value="">Pilih Kode CPL</option>
                                    {dataCPL.map((item) => (
                                        <option key={item.id_cpl} value={item.id_cpl}>{item.id_cpl} - {item.nama_cpl} </option>
                                    ))}
                                </select>
                                {error.id_cpl && <p className="error">{error.id_cpl}</p>}
                            </label>
                            <label>
                                Kode Capaian Pembelajaran Mata Kuliah
                                <input
                                    type="text"
                                    value={formData.id_cpmk}
                                    onChange={handleChange}
                                    name="id_cpmk"
                                />
                                {error.id_cpmk && <p className="error">{error.id_cpmk}</p>}
                            </label>
                            <label>
                                Nama Capaian Pembelajaran Mata Kuliah
                                <input
                                    type="text"
                                    value={formData.nama_cpmk}
                                    onChange={handleChange}
                                    name="nama_cpmk"
                                />
                                {error.nama_cpmk && <p className="error">{error.nama_cpmk}</p>}
                            </label>
                            <label>
                                Bobot Capaian Pembelajaran Mata Kuliah
                                <input
                                    type="text"
                                    value={formData.bobot_cpmk}
                                    onChange={handleChange}
                                    name="bobot_cpmk"
                                />
                                {error.bobot_cpmk && <p className="error">{error.bobot_cpmk}</p>}
                            </label>
                            <button type="submit">Submit</button>
                        </div>

                    </form>
                </Box>
            </Modal>
        </div >
    );
}

export default ModalInputCPMK;
