import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { NavbarComponent, FooterComponent, DataComponent } from "../../Components";
import "./Dashboarddepartment.css";
const DashboardDepartment = () => {
    const [redirect, setredirect] = useState('');
    const [totalMahasiswa, setTotalMahasiswa] = useState('');
    const [totalDosen, setTotalDosen] = useState('');
    const [totalMK, setTotalMK] = useState('');
    useEffect(() => {
        const redirect = localStorage.getItem('redirect');
        const totalMhs = localStorage.getItem('totalMahasiswa');
        const totalDsn = localStorage.getItem('totalDosen');
        const totalmk = localStorage.getItem('totalMK');
        setTotalMahasiswa(totalMhs);
        setTotalDosen(totalDsn);
        setTotalMK(totalmk);

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
            <NavbarComponent />
            <div className="container">
                <h1>Dashboard Department Mahasiswa</h1>
                <div className="content-department">
                    <div className="content-departemen-top">
                        <div className="content-department-1">
                            <h3>Informasi Departemen</h3>
                            <br />
                            <div className="detail-department-1">
                                <h4>Departemen     :   </h4><p>Informatika</p>
                                <h4>Fakultas      :   </h4> <p>Sains dan Matematika</p>
                                <h4>Ketua Departemen :</h4>  <p>Orang kontol</p>
                            </div>
                        </div>
                        <div className="content-department-2">
                            <h3>Informasi Akademik Departemen</h3>
                            <br />
                            <div className="detail-department-2">
                                <DataComponent title="Total Mahasiswa" number={totalMahasiswa} width={"150px"} />
                                <DataComponent title="Total Dosen" number={totalDosen} width={"150px"} />
                                <DataComponent title="Total Mata Kuliah" number={totalMK} width={"150px"} />
                                <DataComponent title="Total Kelas" number={98} width={"150px"} />
                            </div>
                        </div>
                    </div>
                    <div className="content-department-3">
                        <Line
                            data={{
                                labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'],
                                datasets: [
                                    {
                                        label: 'Jumlah Mahasiswa',
                                        data: [3, 2, 2, 4, 5, 6],
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                        ],
                                        borderWidth: 1,
                                    },
                                    {
                                        label: 'Jumlah Dosen',
                                        data: [1, 3, 2, 2, 3, 4],
                                        backgroundColor: [
                                            'rgba(54, 162, 235, 0.2)',
                                        ],
                                        borderColor: [
                                            'rgba(54, 162, 235, 1)',
                                        ],
                                        borderWidth: 1,
                                    },
                                    {
                                        label: 'Jumlah Mata Kuliah',
                                        data: [2, 3, 3, 3, 4, 5],
                                        backgroundColor: [
                                            'rgba(255, 206, 86, 0.2)',
                                        ],
                                        borderColor: [
                                            'rgba(255, 206, 86, 1)',
                                        ],
                                        borderWidth: 1,
                                    },
                                    {
                                        label: 'Jumlah Kelas',
                                        data: [2, 3, 3, 3, 4, 5],
                                        backgroundColor: [
                                            'rgba(75, 192, 192, 0.2)',
                                        ],
                                        borderColor: [
                                            'rgba(75, 192, 192, 1)',
                                        ],
                                        borderWidth: 1,
                                    },
                                ],
                            }}
                            height={300}
                            width={500}
                            options={{
                                maintainAspectRatio: false,
                            }}
                        />
                    </div>
                </div>

            </div>
            <ToastContainer />
            <FooterComponent />
        </>
    );
};

export default DashboardDepartment;
