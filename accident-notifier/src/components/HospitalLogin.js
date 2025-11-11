import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hospitalsData } from '../data/hospitalsData';  // Import the hospital data

function HospitalLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Find the hospital matching the username and password
    const hospital = hospitalsData.find(
      (hospital) => hospital.username === username && hospital.password === password
    );

    if (hospital) {
      // If the hospital is found, store the hospital data in localStorage
      localStorage.setItem('hospital', hospital.name);
      localStorage.setItem('username', hospital.username);
      localStorage.setItem('hospitalId', hospital.id);
      navigate('/hospital-dashboard'); // Redirect to the hospital dashboard
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center text-danger mb-4">Hospital Login</h2>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-danger w-100" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default HospitalLogin;
