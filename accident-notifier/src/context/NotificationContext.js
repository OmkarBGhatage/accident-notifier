import { createContext, useState } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Always adds notification with safe structure
  const addNotification = (newNotification) => {
    const completeNotification = {
      hospitalId: newNotification.hospitalId || '',
      hospitalName: newNotification.hospitalName || '',
      location: newNotification.location || '',
      latitude: newNotification.latitude || '',
      longitude: newNotification.longitude || '',
      mobile: newNotification.mobile || '',
      time: new Date().toLocaleTimeString(),
      status: 'Pending', // Always starts as pending
    };

    setNotifications((prev) => [...prev, completeNotification]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
