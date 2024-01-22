import { useEffect, useRef, useState } from 'react';
import { NavbarComponent, FooterComponent, DataComponent } from "../../Components";
import { Pie } from 'react-chartjs-2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Dashboard.css";

const Dashboard = () => {
  const [redirect, setredirect] = useState('');

  useEffect(() => {
    const redirect = localStorage.getItem('redirect');

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
            <DataComponent title="Jumlah Mahasiswa Terdaftar" number={100} width={"300px"} />
            <DataComponent title="Jumlah Capaian Pembelajaran Lulusan" number={100} width={"300px"} />
            <DataComponent title="Jumlah Capaian Pembelajaran Mata Kuliah" number={100} width={"300px"} />
            <DataComponent title="Jumlah Mata Kuliah" number={100} width={"300px"} />
          </div>
          <div className="operator-2">
            <Pie
              data={{
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [
                  {
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',

                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',

                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              height={300}
              width={500}
              options={{
                maintainAspectRatio: false,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              }}
            />
          </div>
        </div>
        <ToastContainer />
      </div>
      <FooterComponent />
    </>
  );
};

export default Dashboard;
