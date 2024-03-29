import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useEffect, useRef, useState } from 'react';
import { BreadCrumbComponents, FooterComponent, NavbarDosenComponent } from '../../Components'
import './dashboarddosen.css'
import { NavLink } from 'react-router-dom'



const DashboardDosen = () => {
    const [loggedInNama, setLoggedInNama] = useState('');
    const [loggedInNIP, setLoggedInNIP] = useState('');
    const [totalMahasiswa, setTotalMahasiswa] = useState('');
    const [loggedInkodeWali, setLoggedInkodeWali] = useState('');
    const [mahasiswaList, setMahasiswaList] = useState([]);
    const [redirect, setredirect] = useState('');

    useEffect(() => {
        const nama = localStorage.getItem('loggedInNama');
        const nip = localStorage.getItem('loggedInNIP');
        const total = localStorage.getItem('totalMahasiswa');
        const kodeWali = localStorage.getItem('loggedInkodeWali');
        setLoggedInNama(nama);
        setLoggedInNIP(nip);
        setTotalMahasiswa(total);
        setLoggedInkodeWali(kodeWali);

        console.log(nama);
        console.log(kodeWali);

        if (redirect) {
            toast.success("Login Berhasil", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setredirect(redirect);
            localStorage.removeItem('redirect');
        }
    }, []);

    return (
        <>
            <NavbarDosenComponent />
            <div className="container">
                <div className="header-dashboard-dosen">
                    <h3 style={
                        {
                            textAlign: 'center',
                            padding: '20px',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                        }

                    }>Welcome Back, {loggedInNama}</h3>
                    <BreadCrumbComponents />
                </div>
                <div className="content-dosen-wrapper">
                    <div className="content-dosen-1">
                        <h3><GroupsIcon /> &nbsp; &nbsp;Informasi Perwalian</h3>
                        <hr />
                        <br />
                        <div className="detail-dosen-1">
                            <h4>NIP      :   </h4> <p>{loggedInNIP}</p>
                            <h4>Prodi    :    </h4> <p>Informatika</p>
                            <h4>Jumlah Perwalian :   </h4> <p>{totalMahasiswa}</p>
                        </div>
                    </div>
                    <div className="content-dosen-2">
                        <h3> Lanjutkan sebagai</h3>
                        <hr />
                        <div className="detail-dosen-2">
                            <div className="sbg-dosen-pengampu">
                                <h3><SchoolIcon /> &nbsp; &nbsp;Dosen Pengampu</h3>
                                <NavLink to="/dashboard-dosen/upload-data-mahasiswa">
                                    <button>
                                        Lanjutkan
                                    </button>
                                </NavLink>
                            </div>

                            <div className="sbg-dosen-pengampu">
                                <h3><DriveFolderUploadIcon />&nbsp; &nbsp;Dosen Wali</h3>
                                <NavLink to="/dashboard-dosen/dosen-data-mahasiswa">
                                    <button>
                                        Lanjutkan
                                    </button>
                                </NavLink>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            <FooterComponent />
        </>
    )
}

export default DashboardDosen