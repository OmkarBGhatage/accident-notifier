import React, { useState, useContext } from 'react';
import { hospitalsData } from '../data/hospitalsData';
import { NotificationContext } from '../context/NotificationContext';

function Home() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [nearestHospital, setNearestHospital] = useState(null);
  const { addNotification } = useContext(NotificationContext);

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(6);
          const lon = position.coords.longitude.toFixed(6);
          setLatitude(lat);
          setLongitude(lon);
          searchNearestHospital(lat, lon);
        },
        (error) => {
          alert('Error getting location. Please enter coordinates manually.');
          console.error(error);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const searchNearestHospital = (lat = latitude, lon = longitude) => {
    const userLat = parseFloat(lat);
    const userLon = parseFloat(lon);

    if (isNaN(userLat) || isNaN(userLon)) {
      alert('Please enter valid coordinates');
      return;
    }

    const hospitalsWithDistance = hospitalsData.map(h => ({
      ...h,
      distance: getDistanceFromLatLonInKm(userLat, userLon, h.latitude, h.longitude)
    }));

    hospitalsWithDistance.sort((a, b) => a.distance - b.distance);

    if (hospitalsWithDistance.length === 0 || hospitalsWithDistance[0].distance > 50) {
      setNearestHospital(null);
      alert('❗ No hospitals found within 50 km.');
      return;
    }

    setNearestHospital(hospitalsWithDistance[0]);
  };

  const notifyHospital = (hospital) => {
    const confirm = window.confirm(`Are you sure you want to notify "${hospital.name}"?`);
    if (!confirm) return;

    const location = prompt("Enter the accident city/location:");
    const mobile = prompt("Enter your mobile number:");

    if (!location || !mobile) {
      alert("All fields are required.");
      return;
    }

    addNotification({
      hospitalId: hospital.id,
      hospitalName: hospital.name,
      location,
      latitude,
      longitude,
      mobile
    });

    alert(`🚑 Hospital "${hospital.name}" has been notified!`);
  };

  return (
    <div className="container-fluid p-0">
      <div className="bg-dark text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Accident Detection & Emergency Notifier</h1>
          <p className="lead">Find the nearest hospital instantly using your coordinates.</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="text-danger fw-bold">Find Nearest Hospital</h2>
          <p className="text-muted">Enter your coordinates or use GPS to find nearby hospitals.</p>
        </div>

        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <div className="input-group mb-3 shadow-sm">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Enter Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
              <button className="btn btn-outline-secondary" onClick={getUserLocation}>
                📍 Use My Location
              </button>
            </div>
            <div className="d-grid">
              <button className="btn btn-danger" onClick={() => searchNearestHospital()}>
                Find Nearest
              </button>
            </div>
          </div>
        </div>

        {nearestHospital ? (
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card border-danger shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-danger">{nearestHospital.name}</h5>
                  <p className="card-text">
                    <strong>City:</strong> {nearestHospital.city} <br />
                    <strong>Pincode:</strong> {nearestHospital.pincode} <br />
                    <strong>Distance:</strong> {nearestHospital.distance.toFixed(2)} km
                  </p>
                  <button
                    className="btn btn-success"
                    onClick={() => notifyHospital(nearestHospital)}
                  >
                    🚑 Notify Hospital
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted">
            <p>No hospital found. Please enter coordinates or click "📍 Use My Location".</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
