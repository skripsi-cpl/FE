import { useEffect, useState } from 'react';
import { NavbarComponent, FooterComponent, DataComponent } from "../../Components";
import { Pie } from 'react-chartjs-2';
import PieChartIcon from '@mui/icons-material/PieChart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Dashboard.css";

const Dashboard = () => {
  const [redirect, setredirect] = useState('');
  const [totalMahasiswa, setTotalMahasiswa] = useState(''); // [1
  const [totalCPL, setTotalCPL] = useState('');
  const [totalCPMK, setTotalCPMK] = useState('');
  const [totalMK, setTotalMK] = useState('');

  useEffect(() => {
    const mahasiswa = localStorage.getItem('totalMahasiswa');
    const cpl = localStorage.getItem('totalCPL');
    const cpmk = localStorage.getItem('totalCPMK');
    const mk = localStorage.getItem('totalMK');
    setTotalMahasiswa(mahasiswa);
    setTotalCPL(cpl);
    setTotalCPMK(cpmk);
    setTotalMK(mk);

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
        <h1>Welcome back, Operator! 👋</h1>
        <div className="content-operator">
          <div className="operator-1">
            <DataComponent title="Jumlah Mahasiswa Terdaftar" number={totalMahasiswa} />
            <DataComponent title="Jumlah Capaian Pembelajaran Lulusan" number={totalCPL} />
            <DataComponent title="Jumlah Capaian Pembelajaran Mata Kuliah" number={totalCPMK} />
            <DataComponent title="Jumlah Mata Kuliah" number={totalMK} />
          </div>
          <div className="operator-2">
            <div>
              <h3><PieChartIcon /> &nbsp; Data Mahasiswa</h3>
              <hr />
            </div>
            <div>
              <Pie
                data={{
                  labels: ['Jumlah Mahasiswa Terdaftar', 'Jumlah Capaian Pembelajaran Lulusan', 'Jumlah Capaian Pembelajaran Mata Kuliah', 'Jumlah Mata Kuliah'],
                  datasets: [
                    {
                      label: 'Nilai',
                      data: [totalMahasiswa, totalCPL, totalCPMK, totalMK],
                      backgroundColor: [
                        'red',
                        'blue',
                        'yellow',
                        'green',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                height={300}
                width={400}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'right',
                    },

                  },
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true,
                        },
                      },
                    ],
                  }
                }}
              />
            </div>

          </div>
        </div>
        <ToastContainer />
      </div>
      <FooterComponent />
    </>
  );
};

export default Dashboard;
