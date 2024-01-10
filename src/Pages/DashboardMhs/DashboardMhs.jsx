import { NavbarMhsComponent, FooterComponent } from "../../Components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef, useState } from 'react';
import { Radar } from "react-chartjs-2";
import 'chart.js/auto';
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
                    <Radar
                        data={{
                            labels: [
                                "Kehadiran",
                                "Tugas",
                                "Ujian",
                                "Kuis",
                                "Praktikum",
                                "Responsi",
                            ],
                            datasets: [
                                {
                                    label: "Nilai",
                                    data: [90, 80, 70, 60, 50, 40],
                                    backgroundColor: [
                                        "rgba(255, 99, 132, 0.2)",
                                    ],
                                    borderColor: [
                                        "rgba(255, 99, 132, 1)",
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        }}
                        height={400}
                        width={600}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                r: {
                                    angleLines: {
                                        display: false,
                                    },
                                    suggestedMin: 0,
                                    suggestedMax: 100,
                                },
                            },
                        }}
                    />
                </div>
            </div>
            <FooterComponent />
            <ToastContainer />

        </>
    );
};

export default DashboardMhs;
