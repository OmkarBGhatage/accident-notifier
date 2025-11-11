import React, { useContext, useState } from 'react';
import { NotificationContext } from '../context/NotificationContext';

function HospitalDashboard() {
  const { notifications, setNotifications } = useContext(NotificationContext);
  const hospitalName = localStorage.getItem('hospital');

  const hospitalId = notifications.find(notification => notification.hospitalName === hospitalName)?.hospitalId;
  const current = notifications.filter(note => note.hospitalId === hospitalId && note.status !== 'Admitted');
  const previous = notifications.filter(note => note.hospitalId === hospitalId && note.status === 'Admitted');

  const updateStatus = (index) => {
    setNotifications(prev => {
      const updated = [...prev];
      let count = -1;
      const target = updated.find((note) => {
        if (note.hospitalId === hospitalId && note.status !== 'Admitted') {
          count++;
          return count === index;
        }
        return false;
      });
  
      if (target) {
        if (target.status === 'Pending') target.status = 'In Progress';
        else if (target.status === 'In Progress') target.status = 'Admitted';
      }
  
      return updated;
    });
  };
  

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-danger">🏥 Welcome, {hospitalName}</h2>
        <p className="text-muted">Monitor live accident alerts assigned to your hospital.</p>
      </div>

      <div className="card shadow-sm mb-5">
        <div className="card-body">
          <h4 className="card-title text-center mb-4 text-danger">🚨 Live Notifications</h4>
          {current.length === 0 ? (
            <div className="alert alert-info text-center">
              No active notifications. Stay alert!
            </div>
          ) : (
            <ul className="list-group">
              {current.map((note, index) => (
                <li key={index} className="list-group-item">
                  <p className="mb-1">📍 Location: <strong>{note.location}</strong></p>
                  <p className="mb-1">📞 Mobile: {note.mobile}</p>
                  <p className="mb-1">📌 Coordinates: {note.latitude}, {note.longitude}</p>
                  <p className="mb-2">🕒 Time: {note.time}</p>
                  <button
                    className={`btn ${note.status === 'Pending' ? 'btn-warning' : note.status === 'In Progress' ? 'btn-primary' : 'btn-success'}`}
                    onClick={() => updateStatus(index)}
                  >
                    {note.status === 'Pending' ? 'Take Action' : note.status === 'In Progress' ? 'In Progress' : 'Admitted'}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {previous.length > 0 && (
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="card-title text-center mb-4 text-success">🗂️ Previous Notifications</h4>
            <ul className="list-group">
              {previous.map((note, index) => (
                <li key={index} className="list-group-item">
                  <p className="mb-1">📍 Location: <strong>{note.location}</strong></p>
                  <p className="mb-1">📞 Mobile: {note.mobile}</p>
                  <p className="mb-1">📌 Coordinates: {note.latitude}, {note.longitude}</p>
                  <p className="mb-2">🕒 Time: {note.time}</p>
                  <span className="badge bg-success">Admitted</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default HospitalDashboard;
