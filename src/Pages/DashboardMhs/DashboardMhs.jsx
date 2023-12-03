import { NavbarMhsComponent, FooterComponent } from "../../Components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef,useState } from 'react';
import "./Dashboardmhs.css";

// Ambil email dari localStorage
const DashboardMhs = () => {
    const toastShownRef = useRef(false);
    const [loggedInNama, setLoggedInNama] = useState('');
    const [loggedInNIM, setLoggedInNIM] = useState('');
    //trigger toast
    useEffect(() => {
        const loggedInNama = localStorage.getItem('loggedInNama');
        const nama = localStorage.getItem('loggedInNama');
        const nim = localStorage.getItem('loggedInNIM');
        console.log(nama);
        console.log(nim);

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
            setLoggedInNama(nama);

            // ngasih tau klo toast nya udh ke trigger
            toastShownRef.current = true;
        }
    }, []);
    
    return (
        <>
            <NavbarMhsComponent />
            <div className="container">
                <h1>Hello {loggedInNama}</h1>
                
                <div className="content">
                    <p>ini content</p>
                </div>
            </div>
            <FooterComponent />
            <ToastContainer />

        </>
    );
};

export default DashboardMhs;
