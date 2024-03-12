import { useState } from "react";
import PropTypes from "prop-types";
import logoundip from "../../assets/images/logo/logo-undip.png";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  const handleLogin = () => {
    setLoading(true);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Ekspresi reguler untuk memeriksa format email

    if (email.trim() === "" && password.trim() === "") {
      toast.error("Mohon masukkan email dan password",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      setLoading(false);
      return;
    }


    if (email.trim() === "") {
      toast.error("Mohon masukkan email",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      setLoading(false);
      return; // Hentikan proses login jika email kosong
    }

    // Periksa apakah email sesuai dengan format yang diharapkan
    if (!emailPattern.test(email)) {
      toast.error("Format email tidak sesuai",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      setLoading(false);
      return; // Hentikan proses login jika format email tidak sesuai
    }

    // Periksa apakah password kosong
    if (password.trim() === "") {
      toast.error("Mohon masukkan password",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      setLoading(false);
      return; // Hentikan proses login jika password kosong
    }

    const payload = {
      email: email,
      password: password,
    };

    // Panggil API menggunakan fetch
    fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        if (data.redirectTo) {
          navigateTo(`/${data.redirectTo}`);
          localStorage.setItem('loggedInNama', data.name);
          localStorage.setItem('loggedInNama', data.name);
          localStorage.setItem('loggedInAngkatan', data.angkatan);
          localStorage.setItem('loggedInNIM', data.nim || '');
          localStorage.setItem('loggedInNIP', data.nip);
          localStorage.setItem('loggedInkodeWali', data.kode)
          localStorage.setItem('redirect', data.redirectTo);
          localStorage.setItem('loggedRole', data.role);
          localStorage.setItem('totalMahasiswa', data.totalMahasiswa);
          localStorage.setItem('totalDosen', data.totalDosen);
          localStorage.setItem('totalCPL', data.totalCPL);
          localStorage.setItem('totalCPMK', data.totalCPMK);
          localStorage.setItem('totalMK', data.totalMK);
          localStorage.setItem('loggedInAngkatan', data.angkatan);
        } else {
          toast.error("Email atau password salah",
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          setErrorMessage("");
          setLoading(false);
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
        setErrorMessage("Maaf, terjadi kesalahan. Silakan coba lagi.");
        setemail("");
        setPassword("");
        setLoading(false);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <>
      {loading ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <div className="login-wrapper">
            <div className="login-description"></div>
            <div className="login">
              <img
                src={logoundip}
                alt="Logo-Universitas-Indonesia"
                border="0"
                width="100"
                height="100"
              />
              <h2>Silahkan Login</h2>
              <div className="input-group">
                <label>Email:</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  style={{ paddingLeft: '10px' }}
                />
              </div>
              <div className="input-group">
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '10px' }}
                />
              </div>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              <button type="submit">Login</button>
              <div className="login-footer">
                <p>&copy; Skripsi Artefak!</p>
              </div>
            </div>
            <ToastContainer />
          </div>
        </form>
      )}
    </>
  );

};

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
};

export default Login;
