import { useState } from "react";
import PropTypes from "prop-types";
import { FooterComponent } from "../../Components";
import { useNavigate } from "react-router-dom";
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
    console.log(payload);

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
      console.log(data);
      console.log('Response:', data);
      
      if (data.redirectTo === 'dashboardmhs' || data.redirectTo === 'dashboarddosen' || data.redirectTo === 'dashboarddepartment' || data.redirectTo === 'dashboard') {
        localStorage.setItem('loggedInNama', data.name); // Simpan email ke localStorage
        navigateTo(`/${data.redirectTo}`);
      } else {
        setErrorMessage("Format email tidak sesuai");
        setemail("");
        setPassword("");
      }
    })
    .catch(error => {
      console.error('There was an error!', error);
      setErrorMessage("Maaf, terjadi kesalahan. Silakan coba lagi.");
      setemail("");
      setPassword("");
    });
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="login">
          <h2>Login</h2>
          <p>Get Started to see a new World</p>
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
      </div>
      <FooterComponent />
    </>
  );
};

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
};

export default Login;
