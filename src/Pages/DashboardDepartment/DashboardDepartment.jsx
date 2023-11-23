import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useRef } from 'react';
import { NavbarComponent, FooterComponent } from "../../Components";
import "./Dashboarddepartment.css";
const DashboardDepartment = () => {
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
            <NavbarComponent />
            <div className="container">
                <h1>Helo, Guys! ini dashboard Department hasiswa</h1>

                <div className="content">
                    <p>ini content</p>
                </div>
            </div>
            <ToastContainer />
            <FooterComponent />
        </>
    );
};

export default DashboardDepartment;
