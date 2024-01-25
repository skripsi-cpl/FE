import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef, useState } from 'react';
import { FooterComponent, NavbarDosenComponent } from '../../Components'
import './dashboarddosen.css'
import { NavLink } from 'react-router-dom'



const DashboardDosen = () => {
    const [loggedInNama, setLoggedInNama] = useState('');
    const [loggedInNIP, setLoggedInNIP] = useState('');
    const [totalMahasiswa, setTotalMahasiswa] = useState('');
    const [redirect, setredirect] = useState('');

    useEffect(() => {
        
        const nama = localStorage.getItem('loggedInNama');
        const nip = localStorage.getItem('loggedInNIP');
        const total = localStorage.getItem('totalMahasiswa');
        setLoggedInNama(nama);
        setLoggedInNIP(nip);
        setTotalMahasiswa(total);
     

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
            localStorage.removeItem('redirect'); // Remove the item after displaying the toast
        }
    }, []);

    return (
        <>
            <NavbarDosenComponent />
            <div className="container">
                <h1>Welcome Back, {loggedInNama}</h1>
                <div className="content-dosen-wrapper">
                    <div className="content-dosen-1">
                        <h3>Informasi Perwalian</h3>
                        <br />
                        <div className="detail-dosen-1">
                            <h4>NIP      :   </h4> <p>{loggedInNIP}</p>
                            <h4>Prodi    :    </h4> <p>Informatika</p>
                            <h4>Jumlah Perwalian :   </h4> <p>{totalMahasiswa}</p>
                        </div>
                    </div>
                    <div className="content-dosen-2">
                        <h3>Lanjutkan sebagai</h3>
                        <div className="detail-dosen-2">
                            <div className="sbg-dosen-pengampu">
                                <h3>Dosen Pengampu</h3>
                                <NavLink to="/dashboarddosen/uploaddatamhs">
                                    <button>
                                        Lanjutkan
                                    </button>
                                </NavLink>
                            </div>
                            <div className="sbg-dosen-pengampu">
                                <h3>Dosen Wali</h3>
                                <NavLink to="/dashboarddosen/dosendatamhs">
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