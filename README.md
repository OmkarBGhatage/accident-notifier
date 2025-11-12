# accident-notifier

🚨 Accident Emergency Notification System

An integrated IoT + Web solution that detects vehicle accidents and automatically notifies the nearest hospital for emergency response.

🧠 Overview

This system combines Arduino-based accident detection hardware with a React web dashboard for hospitals.

The hardware uses ADXL345 (accelerometer), GPS, and GSM modules to detect impacts and send location data.

The web dashboard displays alerts in real time, allowing hospitals to mark cases as Pending → Received → Responded.

⚙️ Tech Stack

Frontend: React.js, HTML, CSS

Hardware: Arduino, ADXL345 Sensor, GPS, GSM (SIM800L)

Database: MySQL

🩺 Project Modules

Accident Detection (Arduino):
Detects sudden impact and sends SMS with live GPS coordinates.

Hospital Dashboard (React):
Receives alerts, updates status, and manages emergency responses.

Database (MySQL):
Stores hospital data and accident notification logs.

🗄️ Database Setup

Open MySQL or phpMyAdmin.

Run the script in:

/database/accident_detection_system.sql


This will create:

hospitals table (sample hospital data)

notifications table (accident alerts)

⚡ Folder Structure
accident-notifier/
├── frontend/                   # React web dashboard
├── hardware/                   # Arduino IoT code
│   └── bvc_car_acsidenyt.ino
├── database/                   # MySQL schema
│   └── accident_detection_system.sql
└── README.md

👨‍💻 Author

Omkar Ghatage
Bharati Vidyapeeth College of Engineering, Kolhapur
📅 Final Year Project – 2025
