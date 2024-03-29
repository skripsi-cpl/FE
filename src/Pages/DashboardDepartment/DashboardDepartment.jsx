import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApartmentIcon from '@mui/icons-material/Apartment';
import SchoolIcon from '@mui/icons-material/School';
import React, { useEffect, useState } from 'react';
import { FooterComponent, DataComponent, NavbarDepartmentComponent, BreadCrumbComponents } from "../../Components";
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
            <NavbarDepartmentComponent />
            <div className="container">
                <div className="header-dashboard-departemen">
                    <h3 style={
                        {
                            textAlign: 'center',
                            padding: '20px 40px 20px 20px',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                        }
                    }>Dashboard Department Mahasiswa</h3>
                    <BreadCrumbComponents />
                </div>
                <div className="content-department">
                    <div className="content-departemen-top">
                        <div className="content-department-1">
                            <h3><ApartmentIcon /> &nbsp; Informasi Departemen</h3>
                            <hr />
                            <br />
                            <div className="detail-department-1">
                                <h4>Departemen     :   </h4><p>Informatika</p>
                                <h4>Fakultas      :   </h4> <p>Sains dan Matematika</p>
                                <h4>Ketua Departemen :</h4>  <p>Dr. Aris Puji Widodo, S.Si, M.T.</p>
                            </div>
                        </div>
                        <div className="content-department-2">
                            <h3><SchoolIcon /> &nbsp;&nbsp; Informasi Akademik Departemen</h3>
                            <hr />
                            <br />
                            <div className="detail-department-2">
                                <DataComponent title="Total Mahasiswa" number={totalMahasiswa} />
                                <DataComponent title="Total Dosen" number={totalDosen} />
                                <DataComponent title="Total Mata Kuliah" number={totalMK} />
                                <DataComponent title="Total Kelas" number={4} />
                            </div>
                        </div>
                    </div>
                    {/* <div className="content-department-3">
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
                    </div> */}
                </div>

            </div>
            <ToastContainer />
            <FooterComponent />
        </>
    );
};

export default DashboardDepartment;
