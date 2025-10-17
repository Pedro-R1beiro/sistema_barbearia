-- Tabela Clients
CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    phone VARCHAR(20),
    code VARCHAR(100),
    verified TINYINT(1) DEFAULT 0,
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
    status VARCHAR(15) DEFAULT "Marcado",
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appointment_services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  idService INT NOT NULL,
  idAppointment INT NOT NULL,
  FOREIGN KEY (idService) REFERENCES services(id),
  FOREIGN KEY (idAppointment) REFERENCES appointments(id)
);

-- INSERTS

-- Inserindo Clients
INSERT INTO clients (name, email, password, phone, code, verified, active)
VALUES
('Client 1', 'client1@example.com', '$2y$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36hWJ4z9Oyb0m0XK9rQfG5e', '11911111111', 'CLI001', 1, 1),
('Client 2', 'client2@example.com', '$2y$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36hWJ4z9Oyb0m0XK9rQfG5e', '11922222222', 'CLI002', 1, 1);

-- Inserindo Professionals
INSERT INTO professionals (name, email, password, phone, code, verified, active)
VALUES
('Professional 1', 'prof1@example.com', '$2y$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36hWJ4z9Oyb0m0XK9rQfG5e', '11933333333', 'PRO001', 1, 1),
('Professional 2', 'prof2@example.com', '$2y$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36hWJ4z9Oyb0m0XK9rQfG5e', '11944444444', 'PRO002', 1, 1);

-- Inserindo Availability
INSERT INTO availability (idProfessional, dayWeek, startTime, endTime, `break`, startBreak, endBreak)
VALUES
(1, 1, '09:00:00', '18:00:00', 1, '12:00:00', '13:00:00'),
(1, 2, '09:00:00', '18:00:00', 1, '12:00:00', '13:00:00'),
(2, 3, '09:00:00', '18:00:00', 0, NULL, NULL),
(2, 4, '09:00:00', '18:00:00', 0, NULL, NULL);

-- Inserindo Services
INSERT INTO services (name, price, duration, active)
VALUES
('Corte de Cabelo', 50.00, 30, 1),
('Barba', 35.00, 25, 1),
('Sobrancelha', 20.00, 15, 1),
('Massagem Facial', 40.00, 30, 1);

-- Inserindo Appointments
INSERT INTO appointments (date, startTime, endTime, idClient, idService, idProfessional, status)
VALUES
('2025-10-07', '09:00:00', '09:30:00', 1, 1, 1, 'booked'),
('2025-10-07', '10:00:00', '10:25:00', 2, 2, 1, 'completed'),
('2025-10-08', '09:00:00', '09:30:00', 1, 1, 2, 'booked'),
('2025-10-08', '10:00:00', '10:30:00', 2, 3, 2, 'canceled'),
('2025-10-09', '11:00:00', '11:30:00', 1, 4, 1, 'completed'),
('2025-10-09', '14:00:00', '14:30:00', 2, 1, 2, 'booked');

-- Inserindo appointment_services (para simular múltiplos serviços no mesmo agendamento)
INSERT INTO appointment_services (idService, idAppointment)
VALUES
(1, 1), -- Corte
(2, 1), -- Barba
(1, 3), -- Corte
(3, 3), -- Sobrancelha
(4, 5); -- Massagem