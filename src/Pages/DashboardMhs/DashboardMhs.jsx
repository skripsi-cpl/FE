import { NavbarMhsComponent, FooterComponent, DataComponent, BreadCrumbComponents, BackButton } from "../../Components";
import { ToastContainer, toast } from "react-toastify";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from 'react';
import 'chart.js/auto';
import "./Dashboardmhs.css";

// Ambil email dari localStorage
const DashboardMhs = () => {
    const [loggedInNama, setLoggedInNama] = useState('');
    const [loggedInNim, setLoggedInNim] = useState('');
    const [loggedInAngkatan, setLoggedInAngkatan] = useState('');
    const [redirect, setredirect] = useState('');

    useEffect(() => {
        const redirect = localStorage.getItem('redirect');
        const nama = localStorage.getItem('loggedInNama');
        const nim = localStorage.getItem('loggedInNIM');
        const angkatan = localStorage.getItem('loggedInAngkatan');

        setLoggedInNama(nama);
        setLoggedInNim(nim);
        setLoggedInAngkatan(angkatan);


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
            <NavbarMhsComponent />
            <div className="container">
                <div className="header-all-content">
                    <h3 style={
                        {
                            textAlign: 'center',
                            padding: '20px',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                        }
                    }>Welcome back, {loggedInNama} 👋</h3>
                    <BreadCrumbComponents />
                </div>
                <div className="content-mhs">
                    <div className="content-profil-1">
                        <h3><AccountBoxIcon />&nbsp;&nbsp;Informasi Mahasiswa</h3>
                        <hr />
                        <div className="detail-profil-1">
                            <h4>Nama     :   </h4> <p>{loggedInNama}</p>
                            <h4>NIM      :   </h4> <p>{loggedInNim}</p>
                            <h4>Angkatan      :   </h4> <p>{loggedInAngkatan}</p>
                            <h4>Dosen Wali      :   </h4> <p>Dr. Aris Puji Widodo, S.Si, M.T.</p>
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent />
            <ToastContainer />

        </>
    );
};

export default DashboardMhs;
