import { useEffect, useRef,useState } from 'react';
import { NavbarComponent, FooterComponent } from "../../Components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Dashboard.css";

const Dashboard = () => {
  const toastShownRef = useRef(false);
  const [loggedInNama, setLoggedInNama] = useState('');
  
  //trigger toast
  useEffect(() => {
    const loggedInNama = localStorage.getItem('loggedInNama');

    if (loggedInNama && !toastShownRef.current) {
      toast.success("Login Berhasil", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoggedInNama(loggedInNama);
      // ngasih tau klo toast nya udh ke trigger
      toastShownRef.current = true;
    }
  }, []);

  return (
    <>
      <NavbarComponent />
      <div className="container">
        <h1>Hello,{loggedInNama}</h1>

        <div className="content">
          <p>This is content</p>
        </div>
        <ToastContainer />
      </div>
      <FooterComponent />
    </>
  );
};

export default Dashboard;
