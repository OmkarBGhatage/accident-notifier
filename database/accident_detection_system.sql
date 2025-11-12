-- Create database
CREATE DATABASE accident_detection_system;
USE accident_detection_system;

-- Hospitals table
CREATE TABLE hospitals (
    hospital_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8)
);

-- Notifications table
CREATE TABLE notifications (
    notification_id INT PRIMARY KEY AUTO_INCREMENT,
    hospital_id INT,
    location VARCHAR(100),
    time DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Pending', 'Received', 'Responded') DEFAULT 'Pending',
    FOREIGN KEY (hospital_id) REFERENCES hospitals(hospital_id)
);

-- Sample hospital data
INSERT INTO hospitals (name, city, email, password, latitude, longitude) VALUES
-- Mumbai Hospitals
('Jaslok Hospital', 'Mumbai', 'jaslok@mumbai.com', 'hashed_password1', 18.9719, 72.8097),
('Lilavati Hospital', 'Mumbai', 'lilavati@mumbai.com', 'hashed_password2', 19.0513, 72.8290),
('Bombay Hospital', 'Mumbai', 'bombay@mumbai.com', 'hashed_password3', 18.9439, 72.8355),
('Kokilaben Hospital', 'Mumbai', 'kokilaben@mumbai.com', 'hashed_password4', 19.1314, 72.8258),

-- Kolhapur Hospitals
('Aster Aadhar', 'Kolhapur', 'aster@kolhapur.com', 'hashed_password5', 16.7050, 74.2433),
('D Y Patil Hospital', 'Kolhapur', 'dypatil@kolhapur.com', 'hashed_password6', 16.6909, 74.2317),
('Western India Hospital', 'Kolhapur', 'western@kolhapur.com', 'hashed_password7', 16.7011, 74.2388),
('Apple Hospital', 'Kolhapur', 'apple@kolhapur.com', 'hashed_password8', 16.7137, 74.2478),

-- Pune Hospitals
('Ruby Hall Clinic', 'Pune', 'ruby@pune.com', 'hashed_password9', 18.5314, 73.8446),
('Jehangir Hospital', 'Pune', 'jehangir@pune.com', 'hashed_password10', 18.5293, 73.8499),
('Sahyadri Hospital', 'Pune', 'sahyadri@pune.com', 'hashed_password11', 18.5089, 73.8310),
('Aditya Birla Hospital', 'Pune', 'aditya@pune.com', 'hashed_password12', 18.5626, 73.9167),

-- Nagpur Hospitals
('Care Hospital', 'Nagpur', 'care@nagpur.com', 'hashed_password13', 21.1458, 79.0882),
('Wockhardt Hospital', 'Nagpur', 'wockhardt@nagpur.com', 'hashed_password14', 21.1466, 79.0717),
('Orange City Hospital', 'Nagpur', 'orange@nagpur.com', 'hashed_password15', 21.1272, 79.0718),
('Alexis Multispeciality Hospital', 'Nagpur', 'alexis@nagpur.com', 'hashed_password16', 21.1959, 79.0714),

-- Nashik Hospitals
('Ashoka Medicover Hospital', 'Nashik', 'ashoka@nashik.com', 'hashed_password17', 19.9975, 73.7898),
('Apollo Hospital', 'Nashik', 'apollo@nashik.com', 'hashed_password18', 20.0043, 73.7875),
('Sahyadri Super Speciality Hospital', 'Nashik', 'sahyadrinashik@nashik.com', 'hashed_password19', 19.9844, 73.7782),
('Wockhardt Hospital', 'Nashik', 'wockhardtnashik@nashik.com', 'hashed_password20', 19.9913, 73.7860),

-- Bangalore Hospitals
('Manipal Hospital', 'Bangalore', 'manipal@bangalore.com', 'hashed_password21', 12.9584, 77.6440),
('Fortis Hospital', 'Bangalore', 'fortis@bangalore.com', 'hashed_password22', 12.9346, 77.6101),
('Apollo Hospital', 'Bangalore', 'apollo@bangalore.com', 'hashed_password23', 12.9534, 77.6300),
('Narayana Health City', 'Bangalore', 'narayana@bangalore.com', 'hashed_password24', 12.8339, 77.6785);
