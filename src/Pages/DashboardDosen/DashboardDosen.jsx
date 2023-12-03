import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef,useState } from 'react';
import { FooterComponent, NavbarDosenComponent } from '../../Components'
import './dashboarddosen.css'
import { NavLink } from 'react-router-dom'
export const loggedInNama = localStorage.getItem('loggedInNama');

const DashboardDosen = () => {
    const toastShownRef = useRef(false);
    const [loggedInNama, setLoggedInNama] = useState('');
    //trigger toast
    useEffect(() => {
        const loggedInNama = localStorage.getItem('loggedInNama');

        if (loggedInNama && !toastShownRef.current) {
            toast.success("Login Berhasil ", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setLoggedInNama(loggedInNama)
            // ngasih tau klo toast nya udh ke trigger
            toastShownRef.current = true;
        }
    }, []);
    return (
        <>
            <NavbarDosenComponent />
            <div className="container">
                <h1>Helo, {loggedInNama}</h1>

                <div className="content-dosen-wrapper">
                    <div className="content-dosen-1">
                        <h1>Sebagai Dosen Pengampu</h1>
                        <NavLink to="/dashboarddosen/uploaddatamhs">
                            <button>Upload</button>
                        </NavLink>
                    </div>
                    <div className="content-dosen-2">
                        <h1>Sebagai Dosen Wali</h1>
                        <NavLink to="/dashboarddosen/dosendatamhs">
                            <button>Masuk </button>
                        </NavLink>
                    </div>
                </div>
            </div>
            <ToastContainer />
            <FooterComponent />
        </>
    )
}

export default DashboardDosen