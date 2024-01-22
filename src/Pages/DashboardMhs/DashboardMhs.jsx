import { NavbarMhsComponent, FooterComponent, DataComponent } from "../../Components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from 'react';
import 'chart.js/auto';
import "./Dashboardmhs.css";

// Ambil email dari localStorage
const DashboardMhs = () => {
    const [loggedInNama, setLoggedInNama] = useState('');
    const [loggedInNim, setLoggedInNim] = useState('');
    const [redirect, setredirect] = useState('');

    useEffect(() => {
        const redirect = localStorage.getItem('redirect');
        const nama = localStorage.getItem('loggedInNama');
        const nim = localStorage.getItem('loggedInNIM');
        setLoggedInNama(nama);
        setLoggedInNim(nim);

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
            <NavbarMhsComponent />
            <div className="container">
                <h1>Welcome back, {loggedInNama} 👋</h1>
                <div className="content-mhs">
                    <div className="content-profil-1">
                        <h3>Informasi Mahasiswa</h3>
                        <br />
                        <div className="detail-profil-1">
                            <h4>Nama     :   </h4> <p>{loggedInNama}</p>
                            <h4>NIM      :   </h4> <p>{loggedInNim}</p>
                            <h4>Prodi    :    </h4> <p>Informatika</p>
                            <h4>Semester :   </h4> <p>8</p>
                        </div>
                    </div>
                    <div className="content-profil-2">
                        <h3>Informasi Akademik Mahasiswa</h3>
                        <br />
                        <div className="detail-profil-2">
                            <DataComponent title="SKS Kumulatif" number={100} width={"150px"} />
                            <DataComponent title="IP Kumulatif" number={3.64} width={"150px"} />
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
