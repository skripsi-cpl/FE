import { NavbarMhsComponent, FooterComponent } from "../../Components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useRef } from 'react';
import "./Dashboardmhs.css";
export const loggedInNama = localStorage.getItem('loggedInNama');
export const loggedInNIM = localStorage.getItem('loggedInNIM');
// Ambil email dari localStorage
const DashboardMhs = () => {
    const toastShownRef = useRef(false);
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

            // ngasih tau klo toast nya udh ke trigger
            toastShownRef.current = true;
        }
    }, []);
    return (
        <>
            <NavbarMhsComponent />
            <div className="container">
                <h1>Helo {loggedInNama}</h1>
                <h1>Helo {loggedInNIM}</h1>
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
