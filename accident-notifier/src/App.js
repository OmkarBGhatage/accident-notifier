import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import HospitalLogin from './components/HospitalLogin';
import HospitalDashboard from './components/HospitalDashboard';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Accident Notifier</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/hospital-login">Hospital Login</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hospital-login" element={<HospitalLogin />} />
          <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;
