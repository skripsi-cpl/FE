import { useState } from "react";
import PropTypes from "prop-types";
import logoundip from "../../assets/images/logo/logo-undip.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigateTo = useNavigate();
  const handleLogin = () => {
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
        if (data.redirectTo === 'dashboardmhs' || data.redirectTo === 'dashboarddosen' || data.redirectTo === 'dashboarddepartment' || data.redirectTo === 'dashboard') {
          navigateTo(`/${data.redirectTo}`);
          localStorage.setItem('loggedInNama', data.name);
          localStorage.setItem('loggedInNIM', data.nim || '');
          localStorage.setItem('loggedInNIP', data.nip);
          localStorage.setItem('redirect', data.redirectTo);
          localStorage.setItem('loggedRole', data.role);
          localStorage.setItem('totalMahasiswa', data.totalMahasiswa);
          localStorage.setItem('totalDosen', data.totalDosen);
          localStorage.setItem('totalCPL', data.totalCPL);
          localStorage.setItem('totalCPMK', data.totalCPMK);
          localStorage.setItem('totalMK', data.totalMK);
          console.log(data.nip);
        } else {
          toast.error("Login Gagal",
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          setErrorMessage("Format email tidak sesuai");
          setemail("");
          setPassword("");
        }
      })

      .catch(error => {
        toast.error("Login Gagal",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        console.error('There was an error!', error);
        setErrorMessage("Maaf, terjadi kesalahan. Silakan coba lagi.");
        setemail("");
        setPassword("");
      });
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="login-description">
        </div>
        <div className="login">
          <img src={logoundip} alt="Logo-Universitas-Indonesia" border="0" width="100" height="100" />
          <h2>Silahkan Login</h2>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && (
            <p style={{ color: 'red' }}>{errorMessage}</p>
          )}
          <button onClick={handleLogin}>Login</button>
        </div>
        <ToastContainer />

      </div>
    </>
  );
};

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
};

export default Login;
