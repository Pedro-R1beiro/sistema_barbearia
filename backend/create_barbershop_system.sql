
-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS barbershop_system
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE barbershop_system;

-- Tabela Clients
CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    phone VARCHAR(20),
    code VARCHAR(100),
    verified TINYINT(1) DEFAULT 1,
    active TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela Professionals
CREATE TABLE IF NOT EXISTS professionals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    phone VARCHAR(20),
    code VARCHAR(100),
    verified TINYINT(1) DEFAULT 1,
    active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela Availability
CREATE TABLE IF NOT EXISTS availability (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idProfessional INT NOT NULL,
    dayWeek TINYINT NOT NULL,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    `break` TINYINT(1) DEFAULT 0,
    startBreak TIME DEFAULT NULL,
    endBreak TIME DEFAULT NULL,
    FOREIGN KEY (idProfessional) REFERENCES professionals(id) ON DELETE CASCADE
);

-- Tabela DayOff
CREATE TABLE IF NOT EXISTS dayOff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idProfessional INT NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (idProfessional) REFERENCES professionals(id) ON DELETE CASCADE
);

-- Tabela Vacation
CREATE TABLE IF NOT EXISTS vacation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idProfessional INT NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    FOREIGN KEY (idProfessional) REFERENCES professionals(id) ON DELETE CASCADE
);

-- Tabela Services
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    duration INT NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 1
);

-- Tabela Appointments
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    idClient INT NOT NULL,
    idService INT NOT NULL,
    idProfessional INT NOT NULL,
    FOREIGN KEY (idClient) REFERENCES clients(id),
    FOREIGN KEY (idService) REFERENCES services(id),
    FOREIGN KEY (idProfessional) REFERENCES professionals(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
